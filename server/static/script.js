document.getElementById('trackNS').addEventListener('click', trackNameSearch);
document.getElementById('albumNS').addEventListener('click', albumNameSearch);
document.getElementById('artistNS').addEventListener('click', artistNameSearch);
document.getElementById('createNewList').addEventListener('click', createList);
document.getElementById('updateList').addEventListener('click', updateList);
document.getElementById('deleteList').addEventListener('click', deleteList);
document.getElementById('showAllLists').addEventListener('click', getAllLists);
document.getElementById('showAllListsDetailed').addEventListener('click', getAllListsDetailed);
document.getElementById('genres').addEventListener('click', showGenres);
document.getElementById('artistNS2').addEventListener('click', getArtistData);
document.getElementById('sortTN').addEventListener('click', sortTN);
document.getElementById('sortAN').addEventListener('click', sortAN);
document.getElementById('sortARN').addEventListener('click', sortARN);

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
        });
    })
    )
    .catch(err => console.log('Failed to find track, album or artist of that name'))
}

function sortTN() {
    let table = document.getElementById('trackSearchTable');
    let rowCount = table.rows.length;
    let objArr = [];
    for (i = rowCount - 1; i > 0; i--) {
        let obj = {
            id: table.getElementsByTagName('tr')[i].getElementsByTagName('td')[0].textContent,
            tn: table.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].textContent,
            an: table.getElementsByTagName('tr')[i].getElementsByTagName('td')[2].textContent,
            arn: table.getElementsByTagName('tr')[i].getElementsByTagName('td')[3].textContent,
            rt: table.getElementsByTagName('tr')[i].getElementsByTagName('td')[4].textContent
        }
        objArr.push(obj);
    }

    objArr.sort(compareTN);

    for (i = 1; i < rowCount; i++) {
        table.getElementsByTagName('tr')[i].getElementsByTagName('td')[0].innerText = objArr[i - 1].id;
        table.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerText = objArr[i - 1].tn;
        table.getElementsByTagName('tr')[i].getElementsByTagName('td')[2].innerText = objArr[i - 1].an;
        table.getElementsByTagName('tr')[i].getElementsByTagName('td')[3].innerText = objArr[i - 1].arn;
        table.getElementsByTagName('tr')[i].getElementsByTagName('td')[4].innerText = objArr[i - 1].rt;
    }
}

function sortAN() {
    let table = document.getElementById('trackSearchTable');
    let rowCount = table.rows.length;
    let objArr = [];
    for (i = rowCount - 1; i > 0; i--) {
        let obj = {
            id: table.getElementsByTagName('tr')[i].getElementsByTagName('td')[0].textContent,
            tn: table.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].textContent,
            an: table.getElementsByTagName('tr')[i].getElementsByTagName('td')[2].textContent,
            arn: table.getElementsByTagName('tr')[i].getElementsByTagName('td')[3].textContent,
            rt: table.getElementsByTagName('tr')[i].getElementsByTagName('td')[4].textContent
        }
        objArr.push(obj);
    }

    objArr.sort(compareAN);

    for (i = 1; i < rowCount; i++) {
        table.getElementsByTagName('tr')[i].getElementsByTagName('td')[0].innerText = objArr[i - 1].id;
        table.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerText = objArr[i - 1].tn;
        table.getElementsByTagName('tr')[i].getElementsByTagName('td')[2].innerText = objArr[i - 1].an;
        table.getElementsByTagName('tr')[i].getElementsByTagName('td')[3].innerText = objArr[i - 1].arn;
        table.getElementsByTagName('tr')[i].getElementsByTagName('td')[4].innerText = objArr[i - 1].rt;
    }
}

function sortARN() {
    let table = document.getElementById('trackSearchTable');
    let rowCount = table.rows.length;
    let objArr = [];
    for (i = rowCount - 1; i > 0; i--) {
        let obj = {
            id: table.getElementsByTagName('tr')[i].getElementsByTagName('td')[0].textContent,
            tn: table.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].textContent,
            an: table.getElementsByTagName('tr')[i].getElementsByTagName('td')[2].textContent,
            arn: table.getElementsByTagName('tr')[i].getElementsByTagName('td')[3].textContent,
            rt: table.getElementsByTagName('tr')[i].getElementsByTagName('td')[4].textContent
        }
        objArr.push(obj);
    }

    objArr.sort(compareARN);

    for (i = 1; i < rowCount; i++) {
        table.getElementsByTagName('tr')[i].getElementsByTagName('td')[0].innerText = objArr[i - 1].id;
        table.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerText = objArr[i - 1].tn;
        table.getElementsByTagName('tr')[i].getElementsByTagName('td')[2].innerText = objArr[i - 1].an;
        table.getElementsByTagName('tr')[i].getElementsByTagName('td')[3].innerText = objArr[i - 1].arn;
        table.getElementsByTagName('tr')[i].getElementsByTagName('td')[4].innerText = objArr[i - 1].rt;
    }
}

function compareTN(a, b) {
    if (a.tn < b.tn){
        return -1;
    }
    if (a.tn > b.tn){
        return 1;
    }
    return 0;
}

function compareAN(a, b) {
    if (a.an < b.an){
        return -1;
    }
    if (a.an > b.an){
        return 1;
    }
    return 0;
}

function compareARN(a, b) {
    if (a.arn < b.arn){
        return -1;
    }
    if (a.arn > b.arn){
        return 1;
    }
    return 0;
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
            alert("Error! Check:\nYour list name\nYour track IDs are valid");
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
            alert("Error! Check:\nIf your list exists\nYour track IDs are valid");
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
    for (i = rowCount - 1; i > 0; i--) {
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

function containsLetter(str) {
    return ((/[a-z]/.test(str)) || (/[A-Z]/.test(str)));
}

function getArtistData() {
    let artistName = document.getElementById('artistName2');
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

    let path = '/artists/' + filterName;

    let rowCount = document.getElementById("artistSearchTable").rows.length;
    for (i = rowCount - 1; i > 0; i--) {
        document.getElementById("artistSearchTable").deleteRow(i);
    }

    fetch(path)
    .then(res => res.json()
    .then(data => {
        data.forEach(e => {
            let path2 = '/artists/id/' + e;
            fetch(path2)
            .then(response => response.json()
            .then(data2 => {

                let table = document.getElementById('artistSearchTable');
                let row = document.createElement('tr');
                let aid = document.createElement('td');
                let an = document.createElement('td');
                let al = document.createElement('td');
                let am = document.createElement('td');

                aid.innerText = data2.artist_id;
                an.innerText = data2.artist_name;
                al.innerText = data2.artist_location;
                am.innerText = data2.artist_members;

                row.appendChild(aid);
                row.appendChild(an);
                row.appendChild(al);
                row.appendChild(am);
                table.appendChild(row);
            })
            )
        });
    })
    )
    .catch(err => console.log('Failed to find track, album or artist of that name'))
}