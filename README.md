The goal of this project was to create an interactive map that plots all earthquakes that have occurred in the past hour. The data for the earthquakes is fetched from the **USGS Earthquake Hazards Program API**, which provides various feeds for earthquake data.

## Features

The map has several features that make the data more understandable:

- **Markers**: Each earthquake is represented by a marker on the map. The size of the marker corresponds to the magnitude of the earthquake, and the color of the marker represents the depth of the earthquake. This allows for a quick visual understanding of the severity and depth of each earthquake.

- **Popups**: When a marker is clicked, a popup appears that provides additional information about the earthquake, including its magnitude, depth, location, and the time it occurred.

- **Legend**: A legend is included in the bottom right corner of the map that explains the color coding for the earthquake depths.

## Implementation

The project was implemented using HTML, CSS, and JavaScript. The Leaflet.js library was used to create the map and the markers, and D3.js was used to fetch the GeoJSON data from the USGS API.

The markers were created by iterating over the features in the GeoJSON data, and for each feature, a circle marker was added to the map at the coordinates provided in the data. The radius of the marker was calculated based on the magnitude of the earthquake, and the color was determined by the depth.

Popups were added to each marker using Leaflet's `bindPopup` method, and the legend was created using Leaflet's control layers.

## Conclusion

This project was a great opportunity to work with real-time data and to learn more about Leaflet.js and D3.js. It was interesting to see the distribution and severity of earthquakes around the world in real-time.
