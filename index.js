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

// Get all genres
app.get('/genres/all', (req, res) => {
    console.log(`GET request for ${req.url}`);
    res.send(genres);
});

// Get artist by artist ID
app.get('/artists/id/:artist_id', (req, res) => {
    const id = req.params.artist_id;
    console.log(`GET request for ${req.url}`);
    
    let results = artists.find(i => i.artist_id === String(id));

    if (results) {
        res.send(results);
    }
    else {
        res.status(404).send(`Artist ${id} was not found!`);
    } 
});

// Get track by track ID
app.get('/tracks/id/:track_id', (req, res) => {
    const id = req.params.track_id;
    console.log(`GET request for ${req.url}`);
    
    let results = tracks.find(i => i.track_id === String(id));

    if (results) {
        res.send(results);
    }
    else {
        res.status(404).send(`Track ${id} was not found!`);
    } 
});

// Get track ID by track title or album title (max 10 results)
app.get('/tracks/:search', (req, res) => {
    const search = req.params.search;
    let n = 10; // Allow at most 10 results
    console.log(`GET request for ${req.url}`);
    
    let results = [];
    for (i = 0; i < tracks.length; i++) {
        if ((tracks[i]['track_title']).toLowerCase().includes(search.toLowerCase()) || (tracks[i]['album_title']).toLowerCase().includes(search.toLowerCase())) {
            results.push(tracks[i]['track_id']);
            n -= 1;
        }
        if (n <= 0) {
            break;
        }
    }

    if (results.length > 0) {
        res.send(results);
    }
    else {
        res.status(404).send(`${search} was not found!`);
    } 
});

// Get artist ID by artist name
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