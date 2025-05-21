function findSummation(n){
  if(n < 0 || isNaN(n))
    return false;
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += i;
  }
  return sum
}

function uppercaseFirstAndLast(str) {
  let words = str.split(' ');

  let modifiedWords = words.map(word => {
    if (word.length === 1) {
      return word.toUpperCase();
    }
    let firstLetter = word.charAt(0).toUpperCase();
    let lastLetter = word.charAt(word.length - 1).toUpperCase();

    let middlePart = word.slice(1, word.length - 1);

    return firstLetter + middlePart + lastLetter;
  });

  return modifiedWords.join(' ');
}

function findAverageAndMedian(arr){
  if (arr.length === 0) {
    return { average: null, median: null };
  }

  const sum = arr.reduce((acc, num) => acc + num, 0);
  const average = sum / arr.length;

  const sortedNumbers = [...arr].sort((a, b) => a - b);
  let median;

  const middle = Math.floor(sortedNumbers.length / 2);

  if (sortedNumbers.length % 2 === 0) {
    median = (sortedNumbers[middle - 1] + sortedNumbers[middle]) / 2;
  } else {
    median = sortedNumbers[middle];
  }

  return { average, median };
}

function find4Digits(numstr){
  numstr = numstr.split(' ').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
  for (let i = 0; i < numstr.length; i++) {
    if (numstr[i]/1000 >= 1)
      return numstr[i];
  }
  return false;
}

const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'q1.html'));
});

app.post('/submit',(req, res) => {
  res.send(`The sum of all numbers from 1 to ${req.body.num} is: ` + findSummation(req.body.num)
    + "<br>Your modified String is: " + uppercaseFirstAndLast(req.body.str)
    + "<br>Your average and medians are: " + findAverageAndMedian(req.body.arr.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num))).average + ", " + findAverageAndMedian(req.body.arr.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num))).median
    + "<br>Your first 4-digit number is: " + find4Digits(req.body.numstr));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
