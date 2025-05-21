const express = require("express");
const path = require('path');
const http = require('http');
const cookieParser = require("cookie-parser");
const app = express();
const port = 5000;


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, 'q3.html'));
});

app.post('/submit', (req, res) =>{
  function checkTele(tele){
    const telePattern = /^\d{3}-\d{3}-\d{4}$/;
    return telePattern.test(tele);
  }
  let isGood = false;
  const tele = req.body.tele;
  if (checkTele(tele)) {
    isGood = true;
  }
  if(!isGood){
    res.send("The telephone number you entered is not valid, <a href='/'>try again by clicking here.</a>")
  }
  else
    res.send(`Welcome ${req.body.name}, your telephone number is: ${req.body.tele}.`)
});
