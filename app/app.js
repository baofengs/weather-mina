const express = require('express');
const superagent = require('superagent');
const http = require('http');

const app = express();

function getJson (options, onResult) {
    var port = options.port == 443 ? https : http;
    return new Promise(function (resolve, reject) {
        var req = port.request(options, function (res) {
            var output = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                output += chunk;
            });
            res.on('end', function () {
                resolve(JSON.parse(output));
            });
        });
        req.on('error', function (err) {
            reject();
        });
        req.end();
    });
};

const getWeather = (city) => {
    return getJson({
        host: 'weixin.jirengu.com',
        port: 80,
        path: '/weather?key=study_javascript_in_jirengu.com&location=' + city,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const getHourly = (city) => {
    return getJson({
        host: 'weixin.jirengu.com',
        port: 80,
        path: '/weather/future24h?key=study_javascript_in_jirengu.com&location=' + city,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

app.get('/all', function (req, res) {
    const city = req.query.city || 'beijing';
    Promise.all([getWeather(city), getHourly(city)]).then(data => {
        res.send({
            data: data[0].weather[0],
            hourly: data[1].hourly
        });
    });
});

app.get('/', function (req, res) {
    res.set('Content-type', 'application/json;utf-8');
    const city = req.query.city || 'beijing';
    const url = 'http://weixin.jirengu.com/weather?key=study_javascript_in_jirengu.com&location=' + encodeURIComponent(city)
    const sreq = superagent.get(url);
    console.log('sreq: ', sreq);
    sreq.pipe(res);
    sreq.on('end', function () {
    });
});

app.get('/hourly', function (req, res) {
    res.set('Content-type', 'application/json;utf-8');
    const city = req.query.city || 'beijing';
    const url = 'http://weixin.jirengu.com/weather/future24h?key=study_javascript_in_jirengu.com&location=' + encodeURIComponent(city)
    const sreq = superagent.get(url);
    sreq.pipe(res);
    sreq.on('end', function () {
    });
});

app.listen(3000, function () {
    console.log('http://localhost:3000');
});
