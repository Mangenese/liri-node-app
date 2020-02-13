//code to read and set any enviornment var w/ the dotenv package
require("dotenv").config();

//code to import the key.js file and store it in a variable 
var keys = require("./keys.js");
//axios in app
var axios = require("axios");
//moment in app
var moment = require("moment");

var fs = require("fs");
//Spotify in app
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var argv = process.argv;

var liriComm = process.argv[2];

var userInput = "";

for (var i = 3; i < argv.length; i++){
    if (i > 3){
        userInput = userInput + " " + argv[i];
    }
    else {
        userInput += argv[i];
    }
}

function concertThis() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
    axios.get(queryUrl).then(function(response){
        var data= response.data
        for (var i = 0; i < data.length; i++){
            var venueName = data[i].venue.name;
            var venueLocation = data[i].venue.city + ", " + venue.country
            var date = data[i].datetime
            console.log(venueName + " \n"+ venueLocation + " \n" + moment(date).format("MM/DD/YYY"))
            console.log("_______________________\n")
        }
    })


}