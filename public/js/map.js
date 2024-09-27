// // /public/js/map.js
// const socket = io();  // Initialize WebSocket connection
// let map, marker;

// // Initialize the map using Leaflet and OpenStreetMap
// function initMap() {
//   // Set default map center and zoom level
//   const defaultLocation = [0, 0]; // Latitude and Longitude

//   // Create a map instance
//   map = L.map('map').setView(defaultLocation, 2); // [lat, lng], zoom level

//   // Add OSM tile layer
//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(map);

//   // Add a marker to represent the live location
//   marker = L.marker(defaultLocation).addTo(map);

//   // Listen for location updates from the WebSocket
//   socket.on('locationUpdate', (location) => {
//     console.log('Location update received:', location);
//     const newPosition = [location.latitude, location.longitude];

//     // Update marker position and re-center the map
//     marker.setLatLng(newPosition);
//     map.setView(newPosition, 10);  // Zoom to the updated location
//   });
// }

// // Share location with the server using WebSockets
// function shareLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.watchPosition((position) => {
//       const location = {
//         latitude: position.coords.latitude,
//         longitude: position.coords.longitude,
//       };

//       // Send the location to the server via WebSocket
//       socket.emit('shareLocation', location);
//     }, (error) => {
//       console.error('Error getting location:', error);
//     });
//   } else {
//     alert('Geolocation is not supported by your browser');
//   }
// }


// /public/js/map.js
const socket = io();
let map, marker, routeLayer;

// Initialize the map using Leaflet and OpenStreetMap
function initMap() {
  // Default map center (set initially)
  const defaultLocation = [0, 0];  // [lat, lng] for centering the map initially

  // Create the map instance
  map = L.map('map').setView(defaultLocation, 2);  // Default view

  // Add OSM tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Add a marker for live tracking
  marker = L.marker(defaultLocation).addTo(map);

  // Listen for location updates from WebSocket
  socket.on('locationUpdate', (location) => {
    const newPosition = [location.latitude, location.longitude];

    // Update marker position and re-center map to tracked person
    marker.setLatLng(newPosition);
    map.setView(newPosition, 13);  // Center the map to the tracked location

    // If the user is tracking a route, update the route to the tracked person
    if (routeLayer) {
      calculateRoute(newPosition);
    }
  });
}

// Share the tracked person’s location (use this on their device)
function shareLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      
      // Send the location to the server via WebSocket
      socket.emit('shareLocation', location);
    }, (error) => {
      console.error('Error getting location:', error);
    });
  } else {
    alert('Geolocation is not supported by your browser');
  }
}

// Track the route from viewer's location to tracked person
function trackRoute() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = [position.coords.latitude, position.coords.longitude];
      
      // Draw the route from the user's location to the tracked person
      calculateRoute(userLocation);
    });
  } else {
    alert('Geolocation is not supported by your browser');
  }
}

// Function to calculate and display a route from user to tracked person
function calculateRoute(startLocation) {
  if (marker.getLatLng()) {
    const endLocation = marker.getLatLng();  // Tracked person's location

    // Remove previous route if it exists
    if (routeLayer) {
      map.removeLayer(routeLayer);
    }

    // Use an external routing API like OpenRouteService, GraphHopper, or Mapbox for routing
    const routingAPI = `https://router.project-osrm.org/route/v1/driving/${startLocation[1]},${startLocation[0]};${endLocation.lng},${endLocation.lat}?overview=full&geometries=geojson`;
    
    fetch(routingAPI)
      .then(response => response.json())
      .then(data => {
        const route = L.geoJSON(data.routes[0].geometry);
        routeLayer = route.addTo(map);
      })
      .catch(error => console.error('Error fetching route:', error));
  }
}
