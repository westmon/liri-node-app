
var fs = require("fs");
var keys = require("./keys.js")


var Twitter = require('twitter');
var action = process.argv[2];


switch (action) {
  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    spotifySong();
    break;

  case "movie-this":
    movieInfo();
    break;

  case "do-what-it-says":
    doIt();
    break;
}
 

 function myTweets() {
var client = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret,
});

var params = {screen_name: 'monnettwest'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for (var i = 0; i < 20; i++) {
  		
  
    console.log(JSON.stringify(tweets[i].created_at + tweets[i].text, null, 2));
}
  }
});

 }

function spotifySong(){

	var Spotify = require('node-spotify-api');
var song = process.argv[3];


 
var spotify = new Spotify({
  id: keys.spotifyKeys.id,
  secret: keys.spotifyKeys.secret,
});


if (!song){
	song = "The Sign"

}

var title = song;
 
spotify.search({ type: 'track', query: title }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 	
for (var i = 0; i < data.tracks.items.length; i++){
	console.log("\n Artist: " + data.tracks.items[i].artists[0].name, "\n Song Title: " + data.tracks.items[i].name, "\n Preview " + data.tracks.items[i].preview_url, "\n Album" + data.tracks.items[i].album.name); 

}
});

}

function movieInfo(){
	var request = require("request");

	var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {

    movieName = movieName + "+" + nodeArgs[i];

  }

  else {

    movieName += nodeArgs[i];

  }
}


	if (!movieName){
		movieName = "Mr. Nobody";
	}

	console.log(movieName);

// We then run the request module on a URL with a JSON
request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {

    // Then we print out the imdbRating
    console.log("\n Title: " + JSON.parse(body).Title, "\n Release Year: " + JSON.parse(body).Year, "\n imdb Rating: " + JSON.parse(body).imdbRating, "\n Rotten Totomatoes Rating: " + JSON.parse(body).Ratings[1].Value, "\n Produced in: " + JSON.parse(body).Country, "\n Languages: " + JSON.parse(body).Language, "\n Plot: " + JSON.parse(body).Plot, "\n Actors: " + JSON.parse(body).Actors);
  }
});


}




function doIt(){
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }


  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");
 

	var Spotify = require('node-spotify-api');
	var song = dataArr[1];
	console.log(song);



	var spotify = new Spotify({
  	id: keys.spotifyKeys.id,
 	 secret: keys.spotifyKeys.secret,
	});

	var title = song;
 
spotify.search({ type: 'track', query: title }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 	
for (var i = 0; i < data.tracks.items.length; i++){
	console.log("\n Artist: " + data.tracks.items[i].artists[0].name, "\n Song Title: " + data.tracks.items[i].name, "\n Preview " + data.tracks.items[i].preview_url, "\n Album" + data.tracks.items[i].album.name); 

}
});


});


}

