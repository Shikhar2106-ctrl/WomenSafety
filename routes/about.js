const express = require('express');
const router = express.Router();



// Render index view and pass the API key to the frontend
router.get("/",(req,res)=>{
    res.render('about.ejs',{url:req.protocol+"://"+req.headers.host})
})

module.exports = router;