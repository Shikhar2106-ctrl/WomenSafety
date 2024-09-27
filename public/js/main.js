// public/js/main.js

document.getElementById('sosButton').addEventListener('click', function() {
    // Trigger email sending on button press
    fetch('/send-sos-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'SOS! A user is in need of assistance.',
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('SOS email sent successfully!');
      } else {
        alert('Error sending SOS email.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error sending SOS email.');
    });
  });
  



