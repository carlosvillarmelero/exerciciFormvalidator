const express = require("express");
const app = express();
var http = require("http");
var url = require("url");
var fs = require('fs');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert'); //utilitzem assercions

var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));


app.get('/', (req, res) => {
  res.sendFile('index.html');
})

app.post('/form', (req, res) => {
    var route = 'mongodb://localhost:27017/form_validator';


    MongoClient.connect(route, function (err, db) {
        assert.equal(null, err);
        console.log("correct conexion");
        db.collection('users').insertOne({
            "username": req.body.username,
            "password": req.body.password
        });
        assert.equal(err, null);
        console.log("Added correctly");

    });
    //res.sendFile('index.html');
})

  
app.listen(8888, function() {
  console.log("Running on port 8888.");
});