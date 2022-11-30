import React from 'react'

export default function ListsSection() {
  return (
    <>
    <div className="searchLists">
        <h2>Lists</h2>
        <input type="text" placeholder="Search by artist name"/>
        <button>Search</button>
    </div>
    <div classNam="displayLists">
    display lists
    </div>
    </>
  )
}
