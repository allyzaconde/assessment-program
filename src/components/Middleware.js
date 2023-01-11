const express = require('express')
const app = express()

const res = await fetch("https://netzwelt-devtest.azurewebsites.net/Territories/All")
const json = await res.json();
console.log(json);


app.get('/', (req, res, next) => {
    res.send('USER')
    next()
})