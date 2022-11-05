document.getElementById('trackNS').addEventListener('click', getData)

function getData() {

    let trackName = document.getElementById('trackName');
    let filterName = trackName.value.toLowerCase();

    // Don't search if search bar is empty
    if (filterName == ""){
        return;
    }

    // Ensure that the search input is no more than 20 characters and does not contain numbers
    if ((filterName.length > 20)) {
        trackName.value = "";
        return;
    }

    let path = '/tracks/' + filterName;

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
    //catch
}