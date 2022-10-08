// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  console.log(data); 
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      32.000, 10.000
    ],
    zoom: 1,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}

// function createMap(earthquakes) {

//     // Create the tile layer that will be the background of our map.
//     var usMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       // Credit Leaflet Map makers  
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     });
//     var topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
// 	  // Credit Leaflet
//       attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//     });
  
//     // Define a circleRad() function that will give each earthquake a different radius
//     function circleRad(capacity) {
//         return Math.sqrt(capacity) * 500;
//     }

//     // Create a baseMaps object to hold the usMap layer.
//     var baseMaps = {
//       "United States Map": usMap,
//       "Topographical Map": topoMap
//     };
  
//     // Create an overlayMaps object to hold the earthquakes layer.
//     var overlayMaps = {
//       "4.5+ Earthquakes": earthquakes
//     };
  
//     // Create the map object with options.
//     var map = L.map("map-id", {
//       center: [39.8333, -98.5855],
//       zoom: 4,
//       layers: [usMap, earthquakes]
//     });
  
//     // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
//     L.control.layers(baseMaps, overlayMaps, {
//       collapsed: false
//     }).addTo(map);
//   }
  
//   function createMarkers(response) {
  
//     // Pull the "station"**Might Need to Change** property from response.data.
//     var station = response.data.station;
  
//     // Initialize an array to hold earthquake circles.
//     var quakeCenters = [];
  
//     // Loop through the station array.
//     for (var i = 0; i < station.length; i++) {
//       var station = station[i];
  
//       // For each station, create a marker, and bind a popup with the station's name.
//       var quakeCircle = L.circle([station.lat, station.lon], {
//         stroke: false,
//         fillOpacity: 0.5,
//         color: "white",
//         fillColor: "blue",
//         // set radius to magnitude
//         radius: circleRad(station[i].capacity)
//       }).bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
  
//       // Add the marker to the quakeCenters array.
//       quakeCenters.push(quakeCircle);
//     }
  
//     // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
//     createMap(L.layerGroup(quakeCenters));
//   }
  
  
//   // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
//   d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(createMarkers);
  