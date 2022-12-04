import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

export default function ListsSection() {
  return (
    <>
    <div>
      <h2>Lists</h2>
      <button onClick={getAllLists}>View Public Lists</button>
      <button onClick={getAllListsDetailed}>Show Detailed View</button>
    </div>
    <div>
      <ul id="listList">
        <li><b>List Name | Number of Tracks | Runtime | Creator | Rating</b></li>
      </ul>
    </div>
    <div id="listDetailedDiv">

    </div>
    </>
  )
}

export function ListsSectionLogin() {
  const { user } = useAuth0();
  return (
    <>
    <div className={user == undefined ? "hidden" : ""}>
        <input type="text" placeholder="List Name"/>
        <button>Create</button>
    </div>
    </>
  )
}

function getAllLists() {

  while (document.getElementById("listList").firstChild != document.getElementById("listList").lastChild){
    document.getElementById("listList").removeChild(document.getElementById("listList").lastChild);
  }

  fetch('/lists/all/lists')
  .then(res => res.json()
  .then(data => {
      console.log(data);

      data.sort(compareDate);
      data.forEach(e => {
          
          let list = document.getElementById('listList');
          let li = document.createElement('li');
          let p = document.createElement('p');
          p.innerText = e.name + " | " + e.length + " | " + e.runtime + " | " + e.creator + " | " + e.rating;

          li.appendChild(p);
          list.appendChild(li);
      })
  })
  )
}

function compareDate(a, b){
  if (a.lastModified < b.lastModified){
    return -1;
  }
  if (a.lastModified > b.lastModified){
    return 1;
  }
  return 0;
}

// Not working yet
function getAllListsDetailed() {
  let div = document.getElementById('listDetailedDiv');

  while (div.firstChild) {
      div.removeChild(div.lastChild);
  }

  fetch('/lists/all/lists')
  .then(res => res.json()
  .then(data => {
      console.log(data);
      data.forEach(e => {
          let name = e.name;
          let title = document.createElement('h4');
          let table = document.createElement('table');

          let topRow = document.createElement('tr');
          let tidT = document.createElement('th');
          let tnT = document.createElement('th');
          let anT = document.createElement('th');
          let arnT = document.createElement('th');
          let rtT = document.createElement('th');

          tidT.innerText = 'Track ID';
          tnT.innerText = 'Track Name';
          anT.innerText = 'Album Name';
          arnT.innerText = 'Artist Name';
          rtT.innerText = 'Runtime';

          topRow.appendChild(tidT);
          topRow.appendChild(tnT);
          topRow.appendChild(anT);
          topRow.appendChild(arnT);
          topRow.appendChild(rtT);
          table.appendChild(topRow);

          title.innerText = name;
          
          let path = '/lists/' + name;
          fetch(path)
          .then(res2 => res2.json()
          .then(data1 => {
              console.log(data1);
              data1.forEach(el => {
                  fetch('/tracks/id/' + el)
                  .then(response => response.json()
                  .then(data2 => {
                      
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
                      div.appendChild(title);
                      div.appendChild(table);
                  })
                  )
              })
          })
          )
      })
  })
  )
}