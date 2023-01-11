const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000
var bodyParser = require('body-parser')
var request = require('request');

app.use(cors())

app.get('/', cors(), (req, res) => {
    var getOptions = {
        'method': 'GET',
        'url': 'https://netzwelt-devtest.azurewebsites.net/Territories/All',
    };
    request(getOptions, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body)
    });
})

var jsonParser = bodyParser.json()
app.use(express.json());

app.post('/login', cors(), jsonParser, (req, res) =>{
    var postOptions = {
        'method': 'POST',
        body: JSON.stringify(req.body),
        'url': 'https://netzwelt-devtest.azurewebsites.net/Account/SignIn',
        'headers': {
            'Content-Type': 'application/json',
        }
    }
    request(postOptions, function (error, response) {
        if (response.statusCode == 404){
            res.sendStatus(response.statusCode)
        }else{
            console.log("adsfadsf")
            res.send(response.body)
        }
        
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
