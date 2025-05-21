const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const port = 5000;
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {

  let visitCount = parseInt(req.cookies.visitCount) || 0;
  visitCount++;

  res.cookie("visitCount", visitCount, {
    httpOnly: true,
  });

  let message = `Hello, this is the ${visitCount} time that you are visiting my webpage.
    <br> Last time you visited my webpage was on: ${req.cookies.lastVisit}`;

  let currentDate  = new Date();
  res.cookie("lastVisit", currentDate.toString(), {
    httpOnly: true,
  });

  if (visitCount === 1)
    message = "Welcome to my webpage! It is your first time that you are here.";

  res.send(message);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
