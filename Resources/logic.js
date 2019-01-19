// Define a function that will run once per feature (object) in the response.features array
function createFeatures(earthquakeData) {
    console.log(earthquakeData); 

    // Create a popup for each feature (earthquakeData point) 
    function featurePopup(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
          "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
      }

    // Create a GeoJSON layer containing the objects in the features array
    var earthquakes = L.geoJSON(earthquakeData, {

        // Run the featurePopup function once for each object in the features array
        featurePopup: featurePopup
    });

    // Send the earthquakes GeoJSON layer to the createMap function
    createMap(earthquakes);
};

// Define a function that creates a map
function createMap(earthquakes) {
    
    // Define a street layer and a satellite layer
    var streetMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
    
  var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

    // Define a baseMap that contains the two layers
    var baseMap = {
        "Street Map": streetMap,
        "Satellite Map": satelliteMap
    }

    // Create an overlayMap that contains the earthquake geoJSON layer
    var overlayMap = {
        "Earthquakes Today": earthquakes
    };

    // Create the map, centred somewhere near 20ºN and 10ºE
    var MapCoords = [20, 10];
    var mapZoomLevel = 2;

    var map = L.map("map", {
        center: MapCoords,
        zoom: mapZoomLevel,
        layers: [streetMap, satelliteMap]
    });

    // Create a layer control to pass the baseMap and the overlayMap and add it to the map
    var control = L.control.layers(baseMap, overlayMap, {
        collapsed: false
    });
    control.addTo(map);
};

// Create an API call to the USGS geojson for all-day earthquake records (which are updated every five minutes)
var API = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// Perform a GET request to the USGS API endpoint
d3.json(API, function(response){

    // Send the response.features (array) to the createFeatures function
    createFeatures(response.features); // response.features = earthquakeData
});
