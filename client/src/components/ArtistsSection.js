import React from 'react'

export default function ArtistsSection() {
  return (
    <>
    <div className="searchArtists">
        <h2>Artists</h2>
        <input type="text" placeholder="Search by artist name"/>
        <button>Search</button>
    </div>
    <div classNam="displayTracks">
    display artists
    </div>
    </>
  )
}
