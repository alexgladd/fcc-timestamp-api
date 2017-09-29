// server.js
// where your node app starts

// init project
var moment = require('moment');
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/:ts', function(req, res) {
  var inputTs = req.params.ts;
  var mTs = null;
  var result = {
    unix: null,
    natural: null
  };
  
  if (!isNaN(inputTs)) {
    console.log('Parsing as unix number');
    mTs = moment.unix(inputTs);
  } else if (moment(inputTs, 'MMMM D, YYYY').isValid()) {
    console.log('Parsing as month day year');
    mTs = moment(inputTs, 'MMMM D, YYYY');
  } else if (moment(inputTs).isValid()) {
    console.log('Parsing as string');
    mTs = moment(inputTs);
  }
  
  if (mTs) {
    result.unix = mTs.unix();
    result.natural = mTs.format('MMMM D, YYYY');
    
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
