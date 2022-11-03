const fs = require('fs');
const csv = require('csv-parser');
const express = require('express');
const app = express();
const port = 3000;

let data = [];
fs.createReadStream('lab3-data/raw_tracks.csv')
    .pipe(csv())
    .on('data', (rows) => {
        data.push(rows);
    }).on('end', () => {
        const result = data.filter((row) => {
            
        })
        console.log(data);
    })

app.get('/', (req, res) => {
    res.send('test');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});