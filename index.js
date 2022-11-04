const fs = require('fs');
const csv = require('csv-parser');
const express = require('express');
const app = express();
const port = 3000;

var genres = [];
var tracks = [];
var artists = [];


fs.createReadStream('lab3-data/genres.csv')
    .pipe(csv())
    .on('data', (rows) => {
        genres.push(rows);
    }).on('end', () => {
        /*const result = genres.filter((row) => {
            
        })*/
        genres = genres.map((rows) => {
            return {
                'genre_id':rows.genre_id,
                'parent':rows.parent,
                'title':rows.title
            }
        })
        //console.log(genres);
    });

    fs.createReadStream('lab3-data/raw_tracks.csv')
    .pipe(csv())
    .on('data', (rows) => {
        tracks.push(rows);
    }).on('end', () => {
        /*const result = tracks.filter((row) => {
            
        })*/
        tracks = tracks.map((rows) => {
            return {
                'track_id':rows.track_id,
                'album_id':rows.album_id,
                'album_title':rows.album_title,
                'artist_id':rows.artist_id,
                'artist_name':rows.artist_name,
                'tags':rows.tags,
                'track_date_created':rows.track_date_created,
                'track_date_recorded':rows.track_date_recorded,
                'track_duration':rows.track_duration,
                'track_genres':rows.track_genres,
                'track_number':rows.track_number,
                'track_title':rows.track_title
            }
        })
        //console.log(tracks);
    });


fs.createReadStream('lab3-data/raw_artists.csv')
    .pipe(csv())
    .on('data', (rows) => {
        artists.push(rows);
    }).on('end', () => {
        /*const result = artists.filter((row) => {
            
        })*/
        artists = artists.map((rows) => {
            return {
                'artist_id':rows.artist_id,
                'artist_name':rows.artist_name,
                'artist_location':rows.artist_location,
                'tags':rows.tags,
                'artist_members':rows.artist_members,
                'artist_date_created':rows.artist_date_created,
                'artist_active_year_begin':rows.artist_active_year_begin
            }
        })
        //console.log(artists);
    });

/*
function parseCsv (file) {
let data = [];
let dir = 'lab3-data/' + file + '.csv';
fs.createReadStream(dir)
    .pipe(csv())
    .on('data', (rows) => {
        data.push(rows);
    }).on('end', () => {
        const result = data.filter((row) => {
            
        })
        console.log(data);
    });

    switch (fileName) {
        case "genres":
            let newData = results.map((data) => {

            })
    }
    //let newData = 

    //return data;
}*/

// Set up front end
app.use('/', express.static('static'));

// Get all tracks
app.get('/tracks/all', (req, res) => {
    console.log(`GET request for ${req.url}`);
    res.send(tracks);
});

// Get all genres
app.get('/genres/all', (req, res) => {
    console.log(`GET request for ${req.url}`);
    res.send(genres);
});

// Get all artist
app.get('/artists/all', (req, res) => {
    console.log(`GET request for ${req.url}`);
    res.send(artists);
});

// Get specific artist ID by artist name
app.get('/artists/:artist_name', (req, res) => {
    const name = req.params.artist_name;
    console.log(`GET request for ${req.url}`);
    
    let results = [];
    for (i = 0; i < artists.length; i++) {
        if ((artists[i]['artist_name']).toLowerCase().includes(name.toLowerCase())) {
            results.push(artists[i]['artist_id']);
        }
    }
    if (results.length > 0) {
        res.send(results);
    }
    else {
        res.status(404).send(`${name} was not found!`);
    } 
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});