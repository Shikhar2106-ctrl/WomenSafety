// document.getElementById('sosButton').addEventListener('click', function() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(function(position) {
//         const location = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };
  
//         // Trigger email sending with live location link
//         fetch('/send-sos-email', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             message: 'SOS! A user is in need of assistance.',
//             location: location
//           }),
//         })
//         .then(response => response.json())
//         .then(data => {
//           if (data.success) {
//             alert('SOS email sent successfully!');
//           } else {
//             alert('Error sending SOS email.');
//           }
//         })
//         .catch(error => {
//           console.error('Error:', error);
//           alert('Error sending SOS email.');
//         });
//       });
//     } else {
//       alert('Geolocation is not supported by this browser.');
//     }
//   });
//   socket.on('shareLocation', (location) => {
//     currentLocation = location;
//     io.emit('locationUpdate', location);  // Broadcast the location to all connected clients
//   });
  
  