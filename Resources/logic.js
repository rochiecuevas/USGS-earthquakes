// Define a function that will run once per feature (object) in the response.features array
function createFeatures(earthquakeData) {

    // Create a popup for each feature (earthquakeData point) 
    function featurePopup(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>Magnitude: " + feature.properties.mag + "<br>Time: " + new Date(feature.properties.time) + "</p>")
    }

    // Create a GeoJSON layer containing the objects in the features array
    var earthquakes = L.geoJSON(earthquakeData, {

        // Run the featurePopup function once for each object in the features array
        featurePopup: featurePopup
    });

    // Send the earthquakes GeoJSON layer to the createMap function
    createMap(earthquakes);
}

// Create an API call to the USGS geojson for all-day earthquake records (which are updated every five minutes)
var API = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// Perform a GET request to the USGS API endpoint
d3.json(API, function(response){
    console.log(response.features); // response.features is an array of earthquakeData

    // Send the response.features (array) to the createFeatures function
    createFeatures(response.features);
});