document.getElementById('trackNS').addEventListener('click', trackNameSearch);
document.getElementById('albumNS').addEventListener('click', albumNameSearch);
document.getElementById('artistNS').addEventListener('click', artistNameSearch);
document.getElementById('createNewList').addEventListener('click', createList);
document.getElementById('updateList').addEventListener('click', updateList);
document.getElementById('deleteList').addEventListener('click', deleteList);
document.getElementById('showAllLists').addEventListener('click', getAllLists);
document.getElementById('showAllListsDetailed').addEventListener('click', getAllListsDetailed);

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

function getTrackData(whichSearch, textField) {
    let path = '/tracks/' + whichSearch + '/' + textField;

    let rowCount = document.getElementById("trackSearchTable").rows.length;
    for (i = rowCount - 1; i > 0; i--) {
        document.getElementById("trackSearchTable").deleteRow(i);
    }

    fetch(path)
    .then(res => res.json()
    .then(data => {
        console.log(data);
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
            //catch
        });
    })
    //catch
    )
    .catch(err => console.log('Failed to find track or album of that name'))
    //catch
}

function createList() {
    let listName = document.getElementById('listName');
    let filterName = listName.value;
    let trackIds = document.getElementById('trackIds');
    let trackIdsTxt = trackIds.value;

    // Don't create list if list name box is empty
    if (filterName == ""){
        return;
    }

    // Ensure that the list name input is no more than 20 characters
    if ((filterName.length > 20)) {
        listName.value = "";
        return;
    }

    let trackArray = [];
    if (trackIdsTxt != ""){
        trackArray = trackIdsTxt.split(",");
    }

    let newList = {
        tracks: trackArray
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
            alert("List already exists!");
            console.log('Error:', res.status);
        }
    })
    .catch()
}

function updateList() {
    let listName = document.getElementById('listName2');
    let filterName = listName.value;
    let trackIds = document.getElementById('trackIds2');
    let trackIdsTxt = trackIds.value;

    // Don't create list if list name box is empty
    if (filterName == ""){
        return;
    }

    // Ensure that the list name input is no more than 20 characters
    if ((filterName.length > 20)) {
        listName.value = "";
        return;
    }

    let trackArray = [];
    if (trackIdsTxt != ""){
        trackArray = trackIdsTxt.split(",");
    }

    let newList = {
        tracks: trackArray
    }

    let path = '/lists/' + filterName;
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
            alert("List does not exist!");
            console.log('Error:', res.status);
        }
    })
    .catch()
}

function deleteList() {
    let listName = document.getElementById('listName3');
    let filterName = listName.value;

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

function getAllLists() {
    let rowCount = document.getElementById("listTable").rows.length;
    for (i = rowCount - 1; i > 0; i--) {
        document.getElementById("listTable").deleteRow(i);
    }

    fetch('/lists/all/lists')
    .then(res => res.json()
    .then(data => {
        console.log(data);
        data.forEach(e => {
            let table = document.getElementById('listTable');
            let row = document.createElement('tr');
            let nm = document.createElement('td');
            let lg = document.createElement('td');
            let rt = document.createElement('td');

            nm.innerText = e.name;
            lg.innerText = e.length;
            rt.innerText = e.runtime;

            row.appendChild(nm);
            row.appendChild(lg);
            row.appendChild(rt);
            table.appendChild(row);
        })
    })
    )
}

function getAllListsDetailed() {

}