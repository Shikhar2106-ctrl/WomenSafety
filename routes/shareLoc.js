// const express = require('express');
// const router = express.Router();
// const nodemailer = require('nodemailer');
// const dotenv= require('dotenv')

// dotenv.config()

// // Route to handle sending the live location via email
// router.post('/', (req, res) => {
//   const { message, location } = req.body;

//   // Generate a live location URL (e.g., http://your-domain/map?lat=...&lng=...)
//   const liveLocationUrl = `${req.protocol}://${req.headers.host}/map?lat=${location.lat}&lng=${location.lng}`;

//   const transporter = nodemailer.createTransport({
//     service: 'Gmail', // or your email service provider
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: 'saksham8871@gmail.com',  // Replace with the recipient's email
//     subject: 'Live Location Shared',
//     text: `${message}\nTrack the user's live location here: ${liveLocationUrl}`,
//     html: `<h1>Live Location Shared</h1><p>${message}</p><p><a href="${liveLocationUrl}">Track the user's live location</a></p>`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       return res.json({ success: false, message: 'Error sending email.' });
//     } else {
//       console.log('Email sent: ' + info.response);
//       return res.json({ success: true, message: 'Email sent successfully.' });
//     }
//   });
// });

// module.exports = router;
