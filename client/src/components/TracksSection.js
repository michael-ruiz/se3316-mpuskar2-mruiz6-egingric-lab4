import React from 'react'

export default function TracksSection() {
  return (
    <>
    <div className="searchTracks">
        <h2>Tracks</h2>
        <input type="text" placeholder="Search by track name"/>
        <button>Search</button>
        <input type="text" placeholder="Search by artist name"/>
        <button>Search</button>
        <input type="text" placeholder="Search by album name"/>
        <button>Search</button>
    </div>
    <div className="displayTracks">
      display tracks
    </div>
    </>
  )
}
