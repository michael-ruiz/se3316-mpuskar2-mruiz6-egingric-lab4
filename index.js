// Constants and imports
const fs = require('fs');
const csv = require('csv-parser');
const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();

var genres = [];
var tracks = [];
var artists = [];

app.use('/', router);
router.use(express.json());

// Database file
let db = require("./data/lists.json");

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

// Get all genres b1
app.get('/genres/all', (req, res) => {
    console.log(`GET request for ${req.url}`);
    res.send(genres);
});

// Get artist by artist ID b2
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

// Get track by track ID b3
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

// Get track ID by track title or album title (max 10 results) b4
app.get('/tracks/track/:search', (req, res) => {
    const search = req.params.search;
    let n = 10; // Allow at most 10 results
    console.log(`GET request for ${req.url}`);
    
    let results = [];
    for (i = 0; i < tracks.length; i++) {
        if ((tracks[i]['track_title']).toLowerCase().includes(search.toLowerCase())) {
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

app.get('/tracks/album/:search', (req, res) => {
    const search = req.params.search;
    let n = 10; // Allow at most 10 results
    console.log(`GET request for ${req.url}`);
    
    let results = [];
    for (i = 0; i < tracks.length; i++) {
        if ((tracks[i]['album_title']).toLowerCase().includes(search.toLowerCase())) {
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

app.get('/tracks/artist/:search', (req, res) => {
    const search = req.params.search;
    let n = 10; // Allow at most 10 results
    console.log(`GET request for ${req.url}`);
    
    let results = [];
    for (i = 0; i < tracks.length; i++) {
        if ((tracks[i]['artist_name']).toLowerCase().includes(search.toLowerCase())) {
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

// Get artist ID by artist name b5
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

// Create a new list of tracks b6
app.put('/lists/:list_name', (req, res) => {
    const name = req.params.list_name;
    const newList = req.body;
    console.log(`PUT request for ${req.url}`);

    newList.name = String(name);

    let results = db.findIndex(i => i.name === String(name));
    if (results < 0) {
        console.log("Make a new list");
        db.push(newList);

        fs.writeFile("./data/lists.json", JSON.stringify(db), (err) => {
            if (err) throw err;
            console.log("Done writing to file");
        });
        res.send(newList);
    }
    else {
        res.status(404).send(`List ${name} already exists!`);
    }
});

// Save tracks to a list, replace tracks in existing list b7
app.post('/lists/:list_name', (req, res) => {
    const name = req.params.list_name;
    const newList = req.body;
    console.log(`POST request for ${req.url}`);

    newList.name = String(name);

    let results = db.findIndex(i => i.name === String(name));
    if (results < 0) {
        res.status(404).send(`List ${name} does not exist!`);
    }
    else {
        console.log("Modify ", name)
        db[results] = newList;

        fs.writeFile("./data/lists.json", JSON.stringify(db), (err) => {
            if (err) throw err;
            console.log("Done writing to file");
        });

        res.send(newList);
    }
});

// Get list of track IDs with name of list b8
app.get('/lists/:list_name', (req, res) => {
    const name = req.params.list_name;
    console.log(`GET request for ${req.url}`);
    
    let results = db.find(i => i.name === String(name));

    if (results) {
        res.send(results.tracks);
    }
    else {
        res.status(404).send(`List ${name} was not found!`);
    }
});

// Delete a list of tracks b9
app.delete('/lists/:list_name', (req, res) => {
    const name = req.params.list_name;
    console.log(`DELETE request for ${req.url}`);

    let results = db.findIndex(i => i.name === String(name));
    if (results < 0) {
        res.status(404).send(`List ${name} does not exist!`);
    }
    else {
        console.log("Delete ", name);
        db.splice(results, 1); // Remove the item
        fs.writeFile("./data/lists.json", JSON.stringify(db), (err) => {
            if (err) throw err;
            console.log("Done writing to file");
        });

        res.send(`List ${name} deleted!`);
    }
});

// Get all list names, number of tracks in each and total play time b10
app.get('/lists/all/lists', (req, res) => {
    console.log(`GET request for ${req.url}`);

    let results = [];

    for (i = 0; i < db.length; i++){
        let trackArray = db[i].tracks;
        let runtime = 0;

        for (j = 0; j < trackArray.length; j++) {
            let trackID = trackArray[j];
            let track = tracks.find(i => i.track_id === String(trackID));
            if (track){ // If the ID does not exist then don't add to runtime
                let trackDur = track.track_duration;
                runtime += convertMinToSec(trackDur);
            }
        }

        let runtimeStr;
        if (runtime%60 < 10){
            runtimeStr = `${Math.floor(runtime/60)}:0${runtime%60}`;
        }
        else {
            runtimeStr = `${Math.floor(runtime/60)}:${runtime%60}`;
        }

        let obj = {
            "name": db[i].name,
            "length": trackArray.length,
            "runtime": runtimeStr
        }
        results.push(obj);
    }

    res.send(results);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

function convertMinToSec (min) {
    let arr = min.split(":");
    return parseInt(arr[0] * 60) + parseInt(arr[1]);
}