// Define the URLs
var quakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Define a function that will run once per earthquake (object) in the response.features array
function createFeatures(earthquakeData) {
    console.log(earthquakeData[0]); 

    // Create a marker for each earthquake
    // (1) Create an empty list
    var earthquakeMarkers = [] 

    // (2) Create a function that will be used to colour the circleMarkers
    function customColor(radius) {
        if (radius < 2) {
            return "#ffffb2"
        } 
        else if (radius < 4) {
            return "#fed976"
        }
        else if (radius < 5) {
            return "#feb24c"
        }
        else if (radius < 6) {
            return "#fd8d3c"
        }
        else if (radius < 7) {
            return "#fc4e2a"
        }
        else if (radius < 8) {
            return "#e31a1c"
        }
        else {
            return "#b10026"
        }
    };

    // (2) Loop through the earthquakeData array 
    for (var i = 0; i < earthquakeData.length; i ++) {

        // Create a circle marker for each earthquake coordinate with radius proportional to the magnitude of the earthquake
        var marker = L.circleMarker([earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0]], {

            // Use the customColor function to assign colours to the circles based on magnitudes of the earthquakes
            color: customColor(earthquakeData[i].properties.mag),
            fillColor: customColor(earthquakeData[i].properties.mag),
            fillOpacity: 1,

            // Radius of each circle is based on the magnitude of the earthquake
            radius: earthquakeData[i].properties.mag * 3
        }).bindPopup("<h3>" + earthquakeData[i].properties.place + "</h3><hr><p>Magnitude: " + earthquakeData[i].properties.mag + "<br>Depth: " + earthquakeData[i].geometry.coordinates[2] + "km<br>Significance: " + earthquakeData[i].properties.sig + "<br>Time: " + new Date(earthquakeData[i].properties.time)+ "</p>");

        earthquakeMarkers.push(marker);
    };
    console.log(earthquakeMarkers);

    // (3) Create an earthquake layerGroup containing the objects in the features array
    var earthquakes = L.layerGroup(earthquakeMarkers);

    // Send the earthquakes layer to the createMap function
    createMap(earthquakes);
};

// Define a function that creates a map
function createMap(earthquakes) {
    console.log(earthquakes);
    
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

    var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
    });

    // Define a baseMap that contains the two layers
    var baseMap = {
        "Street Map": streetMap,
        "Satellite Map": satelliteMap,
        "Dark Map": darkMap
    };

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
        layers: [satelliteMap, darkMap, streetMap, earthquakes]
    });

    // Create a layer control to pass the baseMap and the overlayMap and add it to the map
    var control = L.control.layers(baseMap, overlayMap, {
        collapsed: false
    });
    control.addTo(map);

    // Create a legend
    var legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info-legend");
        var categories = ["<2", "4", "5", "6", "7", "8", ">9"]
        var colors = ["#ffffb2", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#b10026"];
        var labels = [];

    var legendInfo = "<p id = 'legend-title'><b>Legend</b>: <br> Earthquake Magnitude</p>";
    
    div.innerHTML = legendInfo;

    categories.forEach(function(cat, index) {
        labels.push("<span style = \"background-color: " + colors[index] + "\">" + " " + cat + " " + "</span>");
    });

    div.innerHTML += "<p style = 'text-align: center;'>" + labels.join(" ") + "</p>";

    return div;
    }

    legend.addTo(map);

};

// Create an API call to the USGS geojson for all-day earthquake records (which are updated every five minutes)

// Perform a GET request to the USGS API endpoint
d3.json(quakeURL, function(error, response){
    if (error) throw error;

    // Send the response.features (array) to the createFeatures function
    var earthquakeData = response.features
    createFeatures(earthquakeData); // response.features = earthquakeData
});

    