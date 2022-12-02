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
      <ul id="trackSearchList">
        <li><b>Track Name | Album Name | Artist Name | Runtime</b></li>
      </ul>
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

  while (document.getElementById("trackSearchList").firstChild != document.getElementById("trackSearchList").lastChild){
    document.getElementById("trackSearchList").removeChild(document.getElementById("trackSearchList").lastChild);
  }

  fetch(path)
  .then(res => res.json()
  .then(data => {
      data.forEach(e => {
          let path2 = '/tracks/id/' + e;
          fetch(path2)
          .then(response => response.json()
          .then(data2 => {

              let list = document.getElementById('trackSearchList');
              let li = document.createElement('li');
              let p = document.createElement('p');
              let a = document.createElement('a');
              let input = document.createElement('input');

              p.innerText = data2.track_title + " | " + data2.album_title;

              a.setAttribute('href', `https://www.youtube.com/results?search_query=${data2.album_title}+${data2.track_title}`);
              a.setAttribute('target', '_blank');

              input.setAttribute('type', 'button');
              input.setAttribute('value', "test");

              let button = document.createElement('button');
              button.innerText = "Expand";
              button.onclick = function () {
                p.innerText = data2.track_title + " | " + data2.album_title + " | "  + data2.artist_name + " | " + data2.track_duration;
              }

              li.appendChild(p);
              a.appendChild(input);
              li.appendChild(a);
              li.appendChild(button);
              list.appendChild(li);
          })
          )
      });
  })
  )
  .catch(err => console.log('Failed to find track, album or artist of that name'))
}
