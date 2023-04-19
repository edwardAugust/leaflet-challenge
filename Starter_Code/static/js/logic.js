// Use this link to get the GeoJSON data.
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

function setColor(depth){
  return depth > 90? '#de163a':
    depth > 70? '#cf1593':
    depth > 50? '#7810c7':
    depth > 30? '#1b0dd6':
    depth > 10? '#0a52d9':
      '#66cdaa';
}


function map(points){
  let myMap = L.map("map", {
      center: [40.7128, -74.0059],
      zoom: 5,
      layers: points
    });
    
    // Adding the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap)
}
  // Getting our GeoJSON data
d3.json(url).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
  // L.geoJson(data).addTo(myMap);
  console.log(data.features)
    data = data.features
    // read the geoJSON and create path to "properties"
    let points = L.geoJSON(data, {
      pointToLayer: function(feature, latlng) {
      // point size and color 
      return new L.CircleMarker(latlng, {
          radius: feature.properties.mag*3.3,
          fillColor: setColor(feature.geometry.coordinates[2]), 
          fillOpacity: 0.3
    })
  }});
  map(points) 
  });