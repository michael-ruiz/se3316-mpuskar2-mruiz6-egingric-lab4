document.getElementById('trackNS').addEventListener('click', trackNameSearch);
document.getElementById('albumNS').addEventListener('click', albumNameSearch);
document.getElementById('createNewList').addEventListener('click', createList);

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

    getTrackData(filterName);
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

    getTrackData(filterName);
}

function getTrackData(textField) {
    let path = '/tracks/' + textField;

    fetch(path)
    .then(res => res.json()
    .then(data => {
        console.log(data);
        data.forEach(e => {
            let path2 = '/tracks/id/' + e;
            fetch(path2)
            .then(response => response.json()
            .then(data2 => {
                console.log(data2);

                let table = document.getElementById('trackSearchTable');
                let row = document.createElement('tr');
                let tn = document.createElement('td');
                let an = document.createElement('td');
                let arn = document.createElement('td');
                let rt = document.createElement('td');

                tn.innerText = data2.track_title;
                an.innerText = data2.album_title;
                arn.innerText = data2.artist_name;
                rt.innerText = data2.track_duration;

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

    console.log(trackArray);

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
            console.log('Error:', res.status);
        }
    })
    .catch()
}