import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

export default function ListsSection() {
  const { user } = useAuth0();
  return (
    <>
    <div className={user == undefined ? "hidden" : ""}>
        <h2>Lists</h2>
        <input type="text" placeholder="Search by artist name"/>
        <button>Search</button>
    </div>
    </>
  )
}
