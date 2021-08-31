const express = require('express');
var path = require('path');
const fetch = require('node-fetch');
// const mockAPIResponse = require('./mockAPI.js');
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('website'));

console.log(__dirname);

// API
const apiKey = '5425dcf3207f24314c35b12d22f54867';
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?';
console.log(`Your API Key is ${apiKey}`);
let inputFromUser = []; 

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
})

// POST Route
app.post('/api', async function(req, res) {
    inputFromUser = req.body.url;
    console.log(`You input is: ${inputFromUser}`);
    const apiURL = `${baseURL}key=${apiKey}&lang=en&url=${inputFromUser}`
    console.log(`apiURLs: ${apiURL}`);

    const response = await fetch(apiURL);
    const mcData = await response.json();
    console.log(mcData);
    res.send(mcData);
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('server running');
    console.log(`running on localhost ${port}`);
});