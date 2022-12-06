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
        <h2>Manage Lists</h2>
    </div>
    <div className={user == undefined ? "hidden" : ""}>
            <h3>Create List</h3>
            <input id="listName" type="text" placeholder="List Name"/>
            <input id="trackIds" type="text" placeholder="Track IDs"/>
            <input id="desc" type="text" placeholder="Description (Optional)"/>
            <input type="checkbox" id="vis" name="vis"/>
            <label htmlFor="vis">Public?</label><br/>
            <button onClick={() => createList(user.email)} id="createNewList">Create List</button>
            <p>Input no more than 20 characters for name and numbers separated by commas for IDs</p>
      </div>
      <div className={user == undefined ? "hidden" : ""}>
            <h3>Update List</h3>
            <input id="listName2" type="text" placeholder="List Name"/>
            <input id="trackIds2" type="text" placeholder="Track IDs"/>
            <input id="desc2" type="text" placeholder="Description (Optional)"/>
            <input type="checkbox" id="vis2" name="vis2"/>
            <label htmlFor="vis2">Public?</label><br/>
            <button onClick={() => updateList(user.email)} id="updateList">Update List</button>
            <p>Input no more than 20 characters for name and numbers separated by commas for IDs</p>
      </div>
      <div className={user == undefined ? "hidden" : ""}>
            <h3>Delete List</h3>
            <input id="listName3" type="text" placeholder="List Name"/>
            <button onClick={() => deleteList(user.email)} id="deleteList">Delete List</button>
            <p>Input no more than 20 characters for name</p>
      </div>
      <div className={user == undefined ? "hidden" : ""}>
        <h2>My Lists</h2>
        <button onClick={() => getMyLists(user.email)}>View My Lists</button>
      </div>
      <div className={user == undefined ? "hidden" : ""}>
        <ul id="userListList">
          <li><b>List Name | Number of Tracks | Runtime</b></li>
        </ul>
      </div>
    </>
  )
}

function getAllLists() {
  let n = 10;

  while (document.getElementById("listList").firstChild != document.getElementById("listList").lastChild){
    document.getElementById("listList").removeChild(document.getElementById("listList").lastChild);
  }

  fetch('/lists/all/lists')
  .then(res => res.json()
  .then(data => {
      console.log(data);

      data.sort(compareDate);
      for (let i = 0; i < data.length; i++){
          if (data[i].visibility == "public"){
            let list = document.getElementById('listList');
            let li = document.createElement('li');
            let p = document.createElement('p');
            p.innerText = data[i].name + " | " + data[i].length + " | " + data[i].runtime + " | " + data[i].creator + " | " + data[i].rating;
  
            let button = document.createElement('button');
            button.innerText = "Expand";

            let desc = document.createElement('p');
            desc.innerText = "Description: \n" + data[i].description;
            desc.style.display = "none";

            li.appendChild(p);
            li.appendChild(button);
            li.appendChild(desc);

            data[i].tracksDet.forEach(t => {
                        
              let p = document.createElement('p');
              let a = document.createElement('a');
              let input = document.createElement('input');

              p.innerText = t.track_title + " | " + t.album_title;

              a.setAttribute('href', `https://www.youtube.com/results?search_query=${t.album_title}+${t.track_title}`);
              a.setAttribute('target', '_blank');

              input.setAttribute('type', 'button');
              input.setAttribute('value', "Play");

              let button = document.createElement('button');
              button.innerText = "Expand";
              button.onclick = function () {
                p.innerText = t.track_title + " | " + t.album_title + " | "  + t.artist_name + " | " + t.track_duration;
              }

              p.style.display = "none";
              a.style.display = "none";
              button.style.display = "none";

              li.appendChild(p);
              a.appendChild(input);
              li.appendChild(a);
              li.appendChild(button);
            })

            button.onclick = function () {
              for (let j = 0; j < li.children.length; j++){
                li.children[j].style.display = "";
              }
            }

            list.appendChild(li);
          }

        n--;
        if (n < 1){
          break;
        }
      }
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

function createList(email) {
  let listName = document.getElementById('listName');
  let filterName = listName.value;
  let trackIds = document.getElementById('trackIds');
  let trackIdsTxt = trackIds.value;
  let desc = document.getElementById('desc');
  let descTxt = desc.value;
  let vis = document.getElementById('vis');
  let visTxt;

  // Don't create list if list name box is empty
  if (filterName == ""){
      return;
  }

  // Ensure that the list name input is no more than 20 characters and that the ids don't contain letters
  if ((filterName.length > 20) || containsLetter(trackIdsTxt)) {
      listName.value = "";
      trackIds.value = "";
      return;
  }

  let trackArray = [];
  if (trackIdsTxt != ""){
      trackArray = trackIdsTxt.split(",");
  }

  if (vis.checked) {
    visTxt = "public";
  }
  else {
    visTxt = "private";
  }

  let d1 = new Date();
  let date = `${d1.getDate()}-${d1.getMonth() + 1}-${d1.getFullYear()}`;

  let newList = {
      tracks: trackArray,
      description: descTxt,
      creator: email,
      visibility: visTxt,
      rating: "",
      lastModified: date
  }

  let path = '/lists/' + filterName;
  fetch(path, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(newList)
  })
  .then(res => {
      if (res.ok) {
          res.json()
          .then()
          .catch(err => 'Failed to get json object')
      }
      else {
          alert("Error! Check:\nYour list name\nYour track IDs are valid");
          console.log('Error:', res.status);
      }
  })
  .catch()
}

async function updateList(email) {
  let listName = document.getElementById('listName2');
  let filterName = listName.value;
  let trackIds = document.getElementById('trackIds2');
  let trackIdsTxt = trackIds.value;
  let desc = document.getElementById('desc2');
  let descTxt = desc.value;
  let vis = document.getElementById('vis2');
  let visTxt;
  let creator;

  // Don't create list if list name box is empty
  if (filterName == ""){
      return;
  }

  // Ensure that the list name input is no more than 20 characters and that the ids don't contain letters
  if ((filterName.length > 20) || containsLetter(trackIdsTxt)) {
      listName.value = "";
      trackIds.value = "";
      return;
  }

  let trackArray = [];
  if (trackIdsTxt != ""){
      trackArray = trackIdsTxt.split(",");
  }

  if (vis.checked) {
    visTxt = "public";
  }
  else {
    visTxt = "private";
  }

  let d1 = new Date();
  let date = `${d1.getDate()}-${d1.getMonth() + 1}-${d1.getFullYear()}`;

  let newList = {
    tracks: trackArray,
    description: descTxt,
    creator: email,
    visibility: visTxt,
    rating: "",
    lastModified: date
}

  let path = '/lists/' + filterName;

  // Get creator from list and check that it matches logged in user first
  await fetch(path)
  .then(res2 => res2.json()
  .then(data1 => {
    creator = data1.creator;
  })
  )
  .catch(err => console.log('Failed to find list of that name'))

  if (email === creator){
    fetch(path, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(newList)
    })
    .then(res => {
      if (res.ok) {
          res.json()
          .then()
          .catch(err => 'Failed to get json object')
      }
      else {
          alert("Error! Check:\nIf your list exists\nYour track IDs are valid");
          console.log('Error:', res.status);
      }
    })
    .catch()
  }
  else {
    alert("Cannot edit another user's list!");
  }
}

async function deleteList(email) {
  let listName = document.getElementById('listName3');
  let filterName = listName.value;
  let creator;

  // Don't create list if list name box is empty
  if (filterName == ""){
      return;
  }

  // Ensure that the list name input is no more than 20 characters
  if ((filterName.length > 20)) {
      listName.value = "";
      return;
  }
  

  let path = '/lists/' + filterName;

  // Get creator from list and check that it matches logged in user first
  await fetch(path)
  .then(res2 => res2.json()
  .then(data1 => {
    creator = data1.creator;
  })
  )
  .catch(err => console.log('Failed to find list of that name'))

  if (email === creator){
    fetch(path, {
      method: 'DELETE',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify()
    })
    .then(res => {
      if (res.ok) {
          res.json()
          .then()
          .catch(err => 'Failed to get json object')
      }
      else {
          alert("List does not exist!");
          console.log('Error:', res.status);
      }
    })
    .catch()
  }
  else {
    alert("Cannot delete another user's list!");
  }
}

function containsLetter(str) {
  return ((/[a-z]/.test(str)) || (/[A-Z]/.test(str)));
}

function getMyLists(email){
  let n = 20;

  while (document.getElementById("userListList").firstChild != document.getElementById("userListList").lastChild){
    document.getElementById("userListList").removeChild(document.getElementById("userListList").lastChild);
  }

  fetch('/lists/all/lists')
  .then(res => res.json()
  .then(data => {
      console.log(data);

      for (let i = 0; i < data.length; i++){
        if (data[i].creator === email){
          let list = document.getElementById('userListList');
          let li = document.createElement('li');
          let p = document.createElement('p');
          p.innerText = data[i].name + " | " + data[i].length + " | " + data[i].runtime + " | " + data[i].creator + " | " + data[i].rating;

          let button = document.createElement('button');
          button.innerText = "Expand";

          let desc = document.createElement('p');
          desc.innerText = "Description: \n" + data[i].description;
          desc.style.display = "none";

          li.appendChild(p);
          li.appendChild(button);
          li.appendChild(desc);

          data[i].tracksDet.forEach(t => {
                      
            let p = document.createElement('p');
            let a = document.createElement('a');
            let input = document.createElement('input');

            p.innerText = t.track_title + " | " + t.album_title;

            a.setAttribute('href', `https://www.youtube.com/results?search_query=${t.album_title}+${t.track_title}`);
            a.setAttribute('target', '_blank');

            input.setAttribute('type', 'button');
            input.setAttribute('value', "Play");

            let button = document.createElement('button');
            button.innerText = "Expand";
            button.onclick = function () {
              p.innerText = t.track_title + " | " + t.album_title + " | "  + t.artist_name + " | " + t.track_duration;
            }

            p.style.display = "none";
            a.style.display = "none";
            button.style.display = "none";

            li.appendChild(p);
            a.appendChild(input);
            li.appendChild(a);
            li.appendChild(button);
          })

          button.onclick = function () {
            for (let j = 0; j < li.children.length; j++){
              li.children[j].style.display = "";
            }
          }

          list.appendChild(li);
        }

      n--;
      if (n < 1){
        break;
      }
    }
  })
  )
}