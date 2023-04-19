// Use this link to get the GeoJSON data.
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'


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
    let points = L.geoJSON(data, {
      pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
          radius: feature.properties.mag*5, 
          fillOpacity: 0.85
    })
  }});
  map(points) 
  });