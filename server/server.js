// Constants and imports
const fs = require('fs');
const csv = require('csv-parser');
const express = require('express');
const app = express();
const port = 4000;
const router = express.Router();

var genres = [];
var tracks = [];
var artists = [];

app.use('/', router);
router.use(express.json());

// Database file
let db = require("./data/lists.json");
let userAtt = require("./data/user.json");

fs.createReadStream('server/lab3-data/genres.csv')
    .pipe(csv())
    .on('data', (rows) => {
        genres.push(rows);
    }).on('end', () => {
        genres = genres.map((rows) => {
            return {
                'genre_id':rows.genre_id,
                'parent':rows.parent,
                'title':rows.title
            }
        })
    });

fs.createReadStream('server/lab3-data/raw_tracks.csv')
    .pipe(csv())
    .on('data', (rows) => {
        tracks.push(rows);
    }).on('end', () => {
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
    });

fs.createReadStream('server/lab3-data/raw_artists.csv')
    .pipe(csv())
    .on('data', (rows) => {
        artists.push(rows);
    }).on('end', () => {
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
    });

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

app.get('/tracks/genre/:search', (req, res) => {
    const search = req.params.search;
    let n = 10; // Allow at most 10 results
    console.log(`GET request for ${req.url}`);
    
    let results = [];
    for (i = 0; i < tracks.length; i++) {
        let arrG = tracks[i]['track_genres'];
        let genreArr;
        if (arrG != ""){
            let r = arrG.replace(/'/g, '"');
            genreArr = JSON.parse(r);

            if ((genreArr[0].genre_title).toLowerCase().includes(search.toLowerCase())) {
                results.push(tracks[i]['track_id']);
                n -= 1;
            }
            if (n <= 0) {
                break;
            }
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
    newList.tracksDet = [];

    let count = 0;
    for (i = 0; i < db.length; i++){
        if (db[i].creator === newList.creator) {
            count++;
        }
    }

    if (count >= 20) {
        res.status(404).send(`User ${newList.creator} has 20 playlists!`);
    }

    let results = db.findIndex(i => i.name === String(name));
    if (results < 0) {

        for (i = 0; i < newList.tracks.length; i++) {
            let results = tracks.find(j => j.track_id === String(newList.tracks[i]));
            if (!results) {
                res.status(404).send(`Track of ID ${newList.tracks[i]} does not exist!`);
                return;
            }
            else {
                newList.tracksDet.push(results);
            }
        }

        console.log("Make a new list");
        db.push(newList);

        fs.writeFile("./server/data/lists.json", JSON.stringify(db), (err) => {
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
    newList.tracksDet = [];

    let results = db.findIndex(i => i.name === String(name));
    if (results < 0) {
        res.status(404).send(`List ${name} does not exist!`);
    }
    else {
        for (i = 0; i < newList.tracks.length; i++) {
            let results = tracks.find(j => j.track_id === String(newList.tracks[i]));
            if (!results) {
                res.status(404).send(`Track of ID ${newList.tracks[i]} does not exist!`);
                return;
            }
            else {
                newList.tracksDet.push(results);
            }
        }

        console.log("Modify ", name);
        //newList.avgRating = db[results].avgRating;
        newList.reviews = db[results].reviews;
        db[results] = newList;

        fs.writeFile("./server/data/lists.json", JSON.stringify(db), (err) => {
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
        res.send(results);
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
        fs.writeFile("./server/data/lists.json", JSON.stringify(db), (err) => {
            if (err) throw err;
            console.log("Done writing to file");
        });

        res.send(`List ${name} deleted!`);
    }
});

// Get all list names, number of tracks in each and total play time b10
app.get('/lists/all/lists', (req, res) => {
    console.log(`GET request for ${req.url}`);
    //let maxLength = 10;
    let results = [];
    //let upTo = (db.length > maxLength) ? maxLength : db.length;

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

        let avgRating = 0;
        if (db[i].reviews) {
            let sumRating = 0;
            if (db[i].reviews.length > 0) {
                for (k = 0; k < db[i].reviews.length; k++) {
                    sumRating += parseFloat(db[i].reviews[k].rating);
                }
                avgRating = sumRating / db[i].reviews.length;
            }
        }

        let obj = {
            "name": db[i].name,
            "tracks": trackArray,
            "description": db[i].description,
            "length": trackArray.length,
            "creator": db[i].creator,
            "visibility": db[i].visibility,
            "avgRating": avgRating,
            "lastModified": db[i].lastModified,
            "runtime": runtimeStr,
            "tracksDet": db[i].tracksDet,
            "reviews": db[i].reviews
        }
        results.push(obj);
    }

    res.send(results);
});

// Save review to a list
app.put('/reviews/:list_name', (req, res) => {
    const name = req.params.list_name;
    const newReview = req.body;
    console.log(`PUT request for ${req.url}`);

    let results = db.findIndex(i => i.name === String(name));
    if (results < 0) {
        res.status(404).send(`List ${name} does not exist!`);
    }
    else {
        let reviews = db[results].reviews;
        for (i = 0; i < reviews.length; i++) {
            let results = reviews.find(j => j.creator === String(newReview.creator));
            if (results) {
                res.status(404).send(`Review from user ${newReview.creator} already exists!`);
                return;
            }
        }

        console.log("Modify ", name);
        reviews.push(newReview);

        fs.writeFile("./server/data/lists.json", JSON.stringify(db), (err) => {
            if (err) throw err;
            console.log("Done writing to file");
        });

        res.send(newReview);
    }
});

// Replace existing review in a list
app.post('/reviews/:list_name', (req, res) => {
    const name = req.params.list_name;
    const newReview = req.body;
    console.log(`POST request for ${req.url}`);

    let results = db.findIndex(i => i.name === String(name));
    if (results < 0) {
        res.status(404).send(`List ${name} does not exist!`);
    }
    else {
        let reviews = db[results].reviews;
        if (reviews.length < 1) {
            res.status(404).send(`Review from user ${newReview.creator} does not exist!`);
            return;
        }

        for (i = 0; i < reviews.length; i++) {
            let results = reviews.find(j => j.creator === String(newReview.creator));
            if (!results) {
                res.status(404).send(`Review from user ${newReview.creator} does not exist!`);
                return;
            }
        }

        let r = reviews.findIndex(j => j.creator === String(newReview.creator));

        console.log("Modify ", name);
        reviews[r] = newReview;

        fs.writeFile("./server/data/lists.json", JSON.stringify(db), (err) => {
            if (err) throw err;
            console.log("Done writing to file");
        });

        res.send(newReview);
    }
});

// Delete a review for a list
app.delete('/reviews/:list_name', (req, res) => {
    const name = req.params.list_name;
    const newReview = req.body;
    console.log(`DELETE request for ${req.url}`);

    let results = db.findIndex(i => i.name === String(name));
    if (results < 0) {
        res.status(404).send(`List ${name} does not exist!`);
    }
    else {
        let reviews = db[results].reviews;
        let r = reviews.findIndex(j => j.creator === String(newReview.creator));

        if (r < 0) {
            res.status(404).send(`Review from user ${newReview.creator} does not exist!`);
            return;
        }
        else {
            console.log("Delete ", name, " review from ", newReview.creator);
            reviews.splice(r, 1); // Remove the item
        }

        fs.writeFile("./server/data/lists.json", JSON.stringify(db), (err) => {
            if (err) throw err;
            console.log("Done writing to file");
        });

        res.send(`Review from ${newReview.creator} in ${name} deleted!`);
    }
});

app.get('/user/attributes/all', (req, res) => {
    res.send(userAtt);
});

app.put('/user/attributes/deactivate/:email', (req, res) => {
    let email = req.params.email;
    let dList = userAtt.deactivated;
    
    if (!dList.includes(email)){
        dList.push(email);
        userAtt.deactivated = dList;

        fs.writeFile('./server/data/user.json', JSON.stringify(userAtt), (e) => {
            if (e){throw e};
        });
    }

    else{
        let a = dList.indexOf(email);
        dList.splice(a, 1);
        userAtt.deactivated = dList;

        fs.writeFile('./server/data/user.json', JSON.stringify(userAtt), (e) => {
            if (e){throw e};
        });
    }
});

app.put('/user/attributes/admin/:email', (req, res) => {
    let email = req.params.email;
    let aList = userAtt.admin;

    if (!aList.includes(email)){
        aList.push(email);
        userAtt.admin = aList;

        fs.writeFile('./server/data/user.json', JSON.stringify(userAtt), (e) => {
            if (e){throw e};
        });
    }
});

app.put('/user/attributes/verified/:email', (req, res) => {
    let email = req.params.email;
    let vList = userAtt.verified;

    if (!vList.includes(email)){
        vList.push(email);
        userAtt.verified = vList;

        fs.writeFile('./server/data/user.json', JSON.stringify(userAtt), (e) => {
            if (e){throw e};
        });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

function convertMinToSec (min) {
    let arr = min.split(":");
    return parseInt(arr[0] * 60) + parseInt(arr[1]);
}