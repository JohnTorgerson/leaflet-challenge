// Define earthquakes & tectonic plates from GeoJSON
console.log("Escape From LA!!")

// Store our API earthquakes endpoint as quakeUrl
const quakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
// Store our API tectonic plates endpoint as plateUrl
const plateUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Pass base toggle on/off layers into variables
let quakes = L.layerGroup();
let tec_plates = L.layerGroup();

// Pass base layer keys into object variable
let baseMap = {
    "Earthquakes": quakes,
    "Tectonic Plates": tec_plates
};

// Pass tile layers select into variables
var gray = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: key
});

var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: key
});

var outdoor = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/outdoors-v11",
    accessToken: key
});

var sat = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: key
});

// Pass tile layer keys into object varaible
let tiledMap = {
    "Satellite Map": sat,
    "Grayscale Map": gray,
    "Outdoors Map": outdoor,
    "Dark Map": dark
};

// Create primary load map, using greyscale and earthquake layers
let eqMap = L.map("map", {
    center: [32, 30],
    zoom: 2,
    layers: [dark, quakes]
});

// Add a layer control to the earthquake map
L.control.layers(tiledMap, baseMap, {
    collapsed: false
}).addTo(eqMap);

// Set marker parameters from earthquake json 
d3.json(quakeUrl, function(quakeData) {
  
  // Set marker size params by magnintude from earthquake json
  function markerSize(magnitude) {
      return (magnitude * magnitude * magnitude * .0625);
  }; 

  // Set marker color params by depth from earthquake json 
  function chooseColor(depth) {
      switch(true) {
          case depth >90:
              return "#3C391B";
          case depth > 70:
              return "#5A512A";
          case depth > 50:
              return "#766839";
          case depth > 30:
              return "#927C49";
          case depth > 10:
              return "#9A704E";
          default:
              return "#A36153";
      }
  }

  // Create a GeoJSON layer containing the features array
  L.geoJSON(quakeData, {
      pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
              radius: markerSize(feature.properties.mag),
              fillColor: chooseColor(feature.geometry.coordinates[2]),
              fillOpacity: 0.5,
              color: "blue",
              stroke: true,
              weight: .5
          })
      },
      onEachFeature: function(feature, layer) {
          layer.bindPopup("<h3>Location: " + feature.properties.place + "</h3><hr><p>Date: " + new Date(feature.properties.time) + "</p><hr><p>Magnitude: " + feature.properties.mag + "</p>");
      }
  }).addTo(quakes);
  quakes.addTo(eqMap);
  console.log(quakeData);

  // Set marker parameters from earthquake json 
  d3.json(plateUrl, function(data) {
      L.geoJSON(data, {
          color: "blue",
          opacity: .5, 
          weight: 1
      }).addTo(tec_plates);
      tec_plates.addTo(eqMap);
      console.log(data); 
  });
  
  // Create a legend to display information about our map.
    let info = L.control({
        position: "bottomright"
  });

  /*Setup*/
    
    /*Legend specific*/
    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Depth (km)</h4>";
    div.innerHTML += '<i style="background: #A36153"></i><span>-10 - 10</span><br>';
    div.innerHTML += '<i style="background: #9A704E"></i><span> 10 - 30</span><br>';
    div.innerHTML += '<i style="background: #927C49"></i><span> 30 - 50</span><br>';
    div.innerHTML += '<i style="background: #766839"></i><span> 50 - 70</span><br>';
    div.innerHTML += '<i style="background: #5A512A"></i><span> 70 - 90</span><br>';
    div.innerHTML += '<i style="background: #3C391B"></i><span> 90 +</span>';
    return div;
    };

    legend.addTo(eqMap);
});