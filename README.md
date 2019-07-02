# LIRI Bot

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation
and Recognition Interface, LIRI is a Language Interpretation and Recognition 
Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## LIRI's Commands
```
concert-this
```
```
- spotify-this-song
```
```
- movie-this
```
```
- do-what-it-says
```

## Running LIRI Bot

* __node liri.js concert-this ```<artist/band name here>```__ will search the Bands in Town Artist Events API and 
output:
  * venue name
  * venue location
  * date of event
  
* **node liri.js spotify-this-song ```<song name here>```** will show the following information about the song in your terminal/bash window:
  * Artist(s)
  * The song's name
  * A preview link of the song from Spotify
  * The album that the song is from
     
* __node liri.js movie-this ```<movie name here>```__ will render the following information to your terminal/bash window:
  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.

* __node liri.js do-what-it-says__ takes the text inside of random.txt and then use it to call one of LIRI's commands
