const express= require('express');
const app= express();
const http= require('http');
const path= require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const socketIo = require('socket.io');

require('dotenv').config(); 

const server = http.createServer(app);
const io = socketIo(server);

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const blogRouter = require('./routes/blog');
const loginRouter = require('./routes/login');
const logoRouter = require('./routes/logo');
const friendRouter = require('./routes/friends');
// const shareRouter= require('./routes/shareLoc');

app.set('views',path.join(__dirname, "views"))
app.set("view engine", 'ejs')

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true}))

// app.get("/",(req,res)=>{
//     res.render('index.ejs',{url:req.protocol+"://"+req.headers.host})
// })

app.use("/", indexRouter)
app.use('/about', aboutRouter)
app.use('/blog', blogRouter)
app.use('/login', loginRouter)
app.use('/logo', logoRouter)
app.use('/friends', friendRouter)
// app.use('/shareLoc', shareRouter);


//form
app.post("/create",(req,res)=>{
    res.send("working")
})



// WebSocket connection for live location sharing
let currentLocation = null;

io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Send the current location to new users
  if (currentLocation) {
    socket.emit('locationUpdate', currentLocation);
  }

  // Listen for the tracked person's live location updates
  socket.on('shareLocation', (location) => {
    currentLocation = location;
    io.emit('locationUpdate', location);  // Broadcast the location to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});



//Route to handle SOS email sending
app.post('/send-sos-email', (req, res) => {
  const { message } = req.body;

  // Set up Nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or your email service provider
    auth: {
      user: process.env.EMAIL_USER, // replace with your email
      pass: process.env.EMAIL_PASS, // replace with your email password
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'saksham8871@gmail.com', // replace with volunteer emails
    subject: 'SOS Alert - Assistance Needed',
    text: message,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.json({ success: false, message: 'Error sending SOS email.' });
    } else {
      console.log('Email sent: ' + info.response);
      return res.json({ success: true, message: 'SOS email sent successfully.' });
    }
  });
});




// app.post('/send-sos-email', (req, res) => {
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
//     to: 'saksham8871@gmail.com',  // Replace with volunteer email
//     subject: 'SOS Alert - Assistance Needed',
//     text: `${message}\nTrack the user's live location here: ${liveLocationUrl}`,
//     html: `<h1>SOS Alert</h1><p>${message}</p><p><a href="${liveLocationUrl}">Track the user's live location</a></p>`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       return res.json({ success: false, message: 'Error sending SOS email.' });
//     } else {
//       console.log('Email sent: ' + info.response);
//       return res.json({ success: true, message: 'SOS email sent successfully.' });
//     }
//   });
// });



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});