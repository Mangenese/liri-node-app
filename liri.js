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
function spotifyThis() {
    spotify.search({type: 'track',query: userInput,})
    .then(function(response){
        var data= (response.tracks.items)

        for (var i = 0; i < data.length; i++){
            console.log(data[i].album.artists[0].name)
            console.log(data[i].name)
            console.log(data[i].preview_url)
            console.log(data[i].album.name)
            console.log("\n____________________________\n")
        }
    
  })
  .catch(function (err) {
      console.log("Error encountered: " + err);
  });
       
    
}

function movieThis() {
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"
    axios.get(queryUrl).then(
        function(response) {
            var data = response.data
            console.log("Title: " + data.title);
            console.log("Release year: " + data.Year);
            console.log("IMBD rating: " + data.imbdRating);
            console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
            console.log("Country: " + data.Country);
            console.log("Language: " + data.Language);
            console.log("Plot: " + data.Plot);
            console.log("Actors: " + data.Actors);
            console.log("\n________________________________\n")
        }
    )
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArray = data.split(", ");
        liriComm = dataArray[0];
        userInput = dataArray[1];
        menu()
    })
}

function menu() {
    switch (liriComm) {
        case 'concert-this':
            concertThis();
            break;
        case 'spotify-this-song' :
            spotifyThis();
            break;
        case 'movie-this': 
            movieThis();
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
    }
}

menu();