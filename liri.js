var dotenv = require("dotenv").config();

//import keys file
var keys = require("./keys.js");

var axios = require("axios");

var fs = require("fs");
var Spotify = require('node-spotify-api');
//saves spotify keys to variables
var spotify = new Spotify(keys.spotify);

var request = require("request");

//format dates with moment
var moment = require("moment");

//all node arguments in array to loop for title
var nodeArgs = process.argv;
//vars to capture user input
var option = process.argv[2];
var title = process.argv[3];

/*loop to make title multiple words
var title = ""
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        title = title + "+" + nodeArgs[i];
    } else {
        title += nodeArgs[i];
    }
}
*/

//switch case for options

switch (option) {
    case "concert-this":
        concert(title);
        break;

    case "spotify-this-song":
        song(title);
        break;

    case "movie-this":
        movie(title);
        break;

    case "do-what-it-says":
        says();
        break;

    default:
        console.log("No input found");
}

//concert function
function concert(title) {
    var artistUrl = "https://rest.bandsintown.com/artists/" + title + "/events?app_id=codingbootcamp";

    request(artistUrl, function (error, response, body) {


        if (error) {
            console.log(error)
        } else {
            var concertInfo = JSON.parse(body);
            console.log("======================================================");
            //index 0 gives first array
            console.log("Artist: " + concertInfo[0].lineup)
            console.log("Venue Name: " + concertInfo[0].venue.name);
            console.log("Venue Location: " + concertInfo[0].venue.city + ", " + concertInfo[0].venue.region + ", " + concertInfo[0].venue.country);
            console.log("Event Date: " + moment(concertInfo[0].datetime).format("L"))
            console.log("======================================================")
        }

    })

}
//spotify function
function song(title) {
    var songTitle = process.argv.slice(3).join("");
    if (songTitle === undefined) {
        songTitle = "The Sign by Ace of Spades"
    }
    spotify.search({
        type: "track",
        query: title
    });

}
// movie function 
function movie(title) {
    if (title === undefined) {
        title === "Mr.Nobody";
        console.log("If you haven't watched 'Mr.Nobody' then you should: http://www.imdb.com/title/tt0485947/")
        console.log("\nIt's on Netflix!")
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (err, response, body) {
        if (err) {
            console.log("Error occured: ")
        } else {
            var movieInfo = JSON.parse(body);
            console.log("======================================================");
            console.log("Movie Title: " + movieInfo.Title);
            console.log("Release Date: " + moment(movieInfo.Year).format("YYYY"));
            console.log("IMDB Movie Rating: " + movieInfo.Ratings[0].Value);
            console.log("Rotten Tomatoes Movie Rating: " + movieInfo.Ratings[1].Value);
            console.log("Country of Production: " + movieInfo.Country);
            console.log("Language: " + movieInfo.Language);
            console.log("Plot: " + movieInfo.Plot);
            console.log("Cast: " + movieInfo.Actors)
            console.log("======================================================");
        }
    })
}

//do what it says function
function says() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(err)
        }

        var dataInfo = data.split(",");
        song(dataInfo[1])

    })
}