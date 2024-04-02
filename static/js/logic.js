// Initialize the map
var mymap = L.map('mapid').setView([51.505, -0.09], 2);

// Set up the OSM layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(mymap);

// URL of the GeoJSON data
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson';

// Convert depth to color
function depthToColor(depth) {
    return depth > 50 ? '#800026' :
           depth > 40 ? '#BD0026' :
           depth > 30 ? '#E31A1C' :
           depth > 20 ? '#FC4E2A' :
           depth > 10 ? '#FD8D3C' :
           '#FEB24C';
}

// Convert magnitude to radius
function magnitudeToRadius(magnitude) {
    return magnitude * 20000;
}

// Load the GeoJSON data using D3
d3.json(url).then(function(data) {
    // Create a marker for each earthquake
    data.features.forEach(function(feature) {
        var coordinates = feature.geometry.coordinates;
        var magnitude = feature.properties.mag;
        var depth = coordinates[2];
        var place = feature.properties.place;
        var time = new Date(feature.properties.time).toLocaleString();

        // Create a circle marker
        var circle = L.circle([coordinates[1], coordinates[0]], {
            color: depthToColor(depth), // Convert depth to color
            fillColor: depthToColor(depth),
            fillOpacity: 0.5,
            radius: magnitudeToRadius(magnitude) // Convert magnitude to radius
        }).addTo(mymap);

        // Bind a popup to the marker
        circle.bindPopup(`<b>Place:</b> ${place}<br><b>Magnitude:</b> ${magnitude}<br><b>Depth:</b> ${depth} km<br><b>Time:</b> ${time}`);
    });

    // Create a legend
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        var grades = [0, 10, 20, 30, 40, 50];
        var labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + depthToColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '–' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(mymap);
});