import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

export default function ListsSection() {
  return (
    <>
    <div>
      <h2>Lists</h2>
      <button onClick={getAllLists}>View Public Lists</button>
    </div>
    <div>
      <ul id="listList">
        <li><b>List Name | Number of Tracks | Runtime | Creator | Rating</b></li>
      </ul>
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
          if (e.visibility == "public"){
            let list = document.getElementById('listList');
            let li = document.createElement('li');
            let p = document.createElement('p');
            p.innerText = e.name + " | " + e.length + " | " + e.runtime + " | " + e.creator + " | " + e.rating;
  
            let button = document.createElement('button');
            button.innerText = "Expand";
            button.onclick = function () {
              let desc = document.createElement('p');
              desc.innerText = "Description: \n" + e.description;
              li.appendChild(desc);

              e.tracks.forEach(id => {
                fetch('/tracks/id/' + id)
                .then(response => response.json()
                .then(data2 => {
                        
                  let li = document.createElement('li');
                  let p = document.createElement('p');
                  let a = document.createElement('a');
                  let input = document.createElement('input');
    
                  p.innerText = data2.track_title + " | " + data2.album_title;
    
                  a.setAttribute('href', `https://www.youtube.com/results?search_query=${data2.album_title}+${data2.track_title}`);
                  a.setAttribute('target', '_blank');
    
                  input.setAttribute('type', 'button');
                  input.setAttribute('value', "Play");
    
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
              })


            }

            li.appendChild(p);
            li.appendChild(button);
            list.appendChild(li);
          }
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
