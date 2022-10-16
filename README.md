# Project Name Template
Leaflet - Challenge

### Project Description
An interactive map that uses tiles and layers to visualize tectonic activity such as, recent USGS earthquakes with popup metadata, and location markers that vary depending on depth, and magnitude.

### Author:
* John Torgerson (JohnTorgerson)
---

## Instructions:
#### Task 1. Clone the Repo
    1. From github, clone this `leaflet-challenge` as a local repo
 
#### Task 2. Open a web based interactive computing platform
    1. Open the repo in `Visual Studio`
    2. In folder `static`/`js` create a new file and name it ***config.js***
    3. Insert the following code and ***REPLACE unique parameters*** where instructed:
>let key = "<-REPLACE With Your MapBox API Key->"

#### Task 3. Open the page
    1. Open the page with Live Server
    2. Explore  
---

## Guide to Repo Contents:
### Tools & Supplies:
* JavaScript, leaflet, JSON,  html
---

* `sample.file` is the html file for the landing page of the app
* `README.md` is the instructions and contents of this repo
* In folder, `static`/`css`:
    1. `2-BasicMap.png` is an image showing the primary goal of the app
    2. `5-Advanced.png` is an image showing the advanced goal of the app
* In folder, `static`/`css`:
    1. `style.css` is the file that runs the element style parameters
* In folder, `static`/`js`:
    1. `config.js` is a file you'll need to create for apikeys
    2. `sample_data.csv` is the JavaScript file that controls the app
---

### Observations:
* large functional javascript libraries require a good understanding of the documentation, because they can be finicky about order
* Magnitude increases exponentially so I used magnitude<sup>3</sup> as a numeric starting point for more representational marker size visualization of the variations.
---

### Credits and Special Thanks
* Thanks to USGS for the earthquake data https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
* Thanks to the authors of Leaflet JavaScrip Libraries https://leafletjs.com/
* Thanks to OpenStreetMap for the unique tile layers https://www.mapbox.com/ 
* Thanks to Hugo Ahlenius for an easy to use GeoJSON of tectonic plates boundaries https://github.com/fraxen
* Thanks to Tom Lenzmeier for helping me reorganize my code and getting the order correct as well as some debugging