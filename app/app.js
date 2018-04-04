const express = require('express');
const superagent = require('superagent');

const app = express();

app.get('/', function (req, res) {
  res.set('Content-type', 'application/json;utf-8');
  const city = req.query.city || 'beijing';
  const url = 'http://weixin.jirengu.com/weather?key=study_javascript_in_jirengu.com&location=' + encodeURIComponent(city)
  const sreq = superagent.get(url);
  sreq.pipe(res);
  sreq.on('end', function(){
  });
});

app.get('/hourly', function (req, res) {
  res.set('Content-type', 'application/json;utf-8');
  const city = req.query.city || 'beijing';
  const url = 'http://weixin.jirengu.com/weather/future24h?key=study_javascript_in_jirengu.com&location=' + encodeURIComponent(city)
  const sreq = superagent.get(url);
  sreq.pipe(res);
  sreq.on('end', function(){
  });
});

app.listen(3000, function () {
  console.log('http://localhost:3000');
});

