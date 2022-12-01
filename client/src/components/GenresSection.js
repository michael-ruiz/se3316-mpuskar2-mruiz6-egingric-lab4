import React from 'react'

export default function GenresSection() {
  return (
    <>
    <div className="displayGenres">
      <h2>Genres</h2>
      <button onClick={showGenres}>Show All</button>
    </div>
    <div id="genreDiv">
      <table id="genreTable">
        <tbody>
          <tr>
            <th>Genre Name</th>
            <th>Genre ID</th>
            <th>Parent ID</th>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  )
}

function showGenres() {
  let div = document.getElementById('genreDiv');
  
  if (div.style.display == "") {
      div.style.display = "none";
  }
  else {
      div.style.display = "";
  }

  let table = document.getElementById('genreTable');
  let rowCount = document.getElementById("genreTable").rows.length;
  for (let i = rowCount - 1; i > 0; i--) {
      table.deleteRow(i);
  }

  fetch('/genres/all')
  .then(res => res.json()
  .then(data => {
      data.forEach(e => {

          let row = document.createElement('tr');
          let gn = document.createElement('td');
          let gid = document.createElement('td');
          let pid = document.createElement('td');

          gn.innerText = e.title;
          gid.innerText = e.genre_id;
          pid.innerText = e.parent;

          row.appendChild(gn);
          row.appendChild(gid);
          row.appendChild(pid);
          table.appendChild(row);
      })
  })
  )
}