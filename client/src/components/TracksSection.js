import React from 'react'

export default function TracksSection() {
  return (
    <>
    <div className="searchTracks">
        <h2>Tracks</h2>
        <input id="trackName" type="text" placeholder="Search by track name"/>
        <button onClick={trackNameSearch}>Search</button>
        <input id="artistName" type="text" placeholder="Search by artist name"/>
        <button onClick={artistNameSearch}>Search</button>
        <input id="albumName" type="text" placeholder="Search by album name"/>
        <button onClick={albumNameSearch}>Search</button>
        <input id="genreName" type="text" placeholder="Search by genre name"/>
        <button onClick={genreNameSearch}>Search</button>
    </div>
    <div className="displayTracks">
      display tracks
    </div>
    <div id="trackSearchDiv">
      <table id="trackSearchTable">
        <tbody>
          <tr>
            <th>Track ID</th>
            <th>Track Name</th>
            <th>Album Name</th>
            <th>Artist Name</th>
            <th>Runtime</th>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  )
}

function trackNameSearch() {
  let trackName = document.getElementById('trackName');
  let filterName = trackName.value.toLowerCase();

  // Don't search if search bar is empty
  if (filterName == ""){
      return;
  }

  // Ensure that the search input is no more than 20 characters
  if ((filterName.length > 20)) {
      trackName.value = "";
      return;
  }

  getTrackData('track', filterName);
}

function artistNameSearch() {
  let artistName = document.getElementById('artistName');
  let filterName = artistName.value.toLowerCase();

  // Don't search if search bar is empty
  if (filterName == ""){
      return;
  }

  // Ensure that the search input is no more than 20 characters
  if ((filterName.length > 20)) {
      artistName.value = "";
      return;
  }

  getTrackData('artist', filterName);
}

function albumNameSearch() {
  let albumName = document.getElementById('albumName');
  let filterName = albumName.value.toLowerCase();

  // Don't search if search bar is empty
  if (filterName == ""){
      return;
  }

  // Ensure that the search input is no more than 20 characters
  if ((filterName.length > 20)) {
      albumName.value = "";
      return;
  }

  getTrackData('album', filterName);
}

function genreNameSearch() {
  let genreName = document.getElementById('genreName');
  let filterName = genreName.value.toLowerCase();

  // Don't search if search bar is empty
  if (filterName == ""){
      return;
  }

  // Ensure that the search input is no more than 20 characters
  if ((filterName.length > 20)) {
      genreName.value = "";
      return;
  }

  getTrackData('genre', filterName);
}

function getTrackData(whichSearch, textField) {
  let path = '/tracks/' + whichSearch + '/' + textField;

  let rowCount = document.getElementById("trackSearchTable").rows.length;
  for (let i = rowCount - 1; i > 0; i--) {
      document.getElementById("trackSearchTable").deleteRow(i);
  }

  fetch(path)
  .then(res => res.json()
  .then(data => {
      data.forEach(e => {
          let path2 = '/tracks/id/' + e;
          fetch(path2)
          .then(response => response.json()
          .then(data2 => {

              let table = document.getElementById('trackSearchTable');
              let row = document.createElement('tr');
              let tid = document.createElement('td');
              let tn = document.createElement('td');
              let an = document.createElement('td');
              let arn = document.createElement('td');
              let rt = document.createElement('td');

              tid.innerText = data2.track_id;
              tn.innerText = data2.track_title;
              an.innerText = data2.album_title;
              arn.innerText = data2.artist_name;
              rt.innerText = data2.track_duration;

              row.appendChild(tid);
              row.appendChild(tn);
              row.appendChild(an);
              row.appendChild(arn);
              row.appendChild(rt);
              table.appendChild(row);
          })
          )
      });
  })
  )
  .catch(err => console.log('Failed to find track, album or artist of that name'))
}
