function goto (path){
    console.log(path);
    window.location.href = path;
}

function hover (){

}

async function sendQuery() {
    // Collect slider values
    const adjustor = 25;
    const acousticness = document.getElementById('acousticness').value-adjustor;
    const danceability = document.getElementById('danceability').value-adjustor;
    const energy = document.getElementById('energy').value-adjustor;
    const liveness = document.getElementById('liveness').value-adjustor;
    const loudness = document.getElementById('loudness').value;
    const speechiness = document.getElementById('speechiness').value-adjustor;
    const tempo = document.getElementById('tempo').value;
    const valence = document.getElementById('valence').value-adjustor;
    const start_year = document.getElementById('years1').value;
    const end_year = document.getElementById('years2').value;

    console.log('sendQuery called');
    console.log(JSON.stringify({ acousticness, danceability, energy, liveness, loudness, speechiness, tempo, valence, start_year, end_year }));
    
    // Make AJAX request
    const response = await fetch('/buildQuery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ acousticness, danceability, energy, liveness, loudness, speechiness, tempo, valence, start_year, end_year }),
    
    });
    console.log(response);

    // Get response from server
    const json_response = await response.json();
    console.log(json_response.data);

    // remove previous response rows
    var tableBody = document.getElementById('tableBody');
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    const headers = ["track_name", "principal_artist_name", "album_name", "popularity"];
    for (var i = 0; i < json_response.data.length; i++) {
        console.log(i);
        var row = document.createElement('tr'); // create a new table row
        
        for (var j=0; j< headers.length; j++){
            var cell = document.createElement('td');
            cell.innerHTML = json_response.data[i][headers[j]];
            row.appendChild(cell);
        }
        document.getElementById('tableBody').appendChild(row); // append the row to the table body
    }
  }


  async function sendMiniQuery() {
    // Collect slider values
    const acousticness = document.getElementById('acousticness').value;
    const danceability = document.getElementById('danceability').value;
    const energy = document.getElementById('energy').value;
    const liveness = document.getElementById('liveness').value;
    const loudness = document.getElementById('loudness').value;
    const speechiness = document.getElementById('speechiness').value;
    const tempo = document.getElementById('tempo').value;
    const valence = document.getElementById('valence').value;
    const year = document.getElementById('year').value-5;
    const duration = document.getElementById('duration').value;

    console.log('sendMiniQuery called');
    console.log(JSON.stringify({ acousticness, danceability, energy, liveness, loudness, speechiness, tempo, valence, year, duration }));
    
    // Make AJAX request
    const response = await fetch('/buildMiniQuery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ acousticness, danceability, energy, liveness, loudness, speechiness, tempo, valence, year, duration}),
    
    });
    console.log(response);
    
    // Get response from server
    const json_response = await response.json();
    console.log(json_response.data);

    // remove previous response rows
    var tableBody = document.getElementById('tableBody');
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    const headers = ["track_name", "principal_artist_name", "album_name", "popularity"];
    for (var i = 0; i < json_response.data.length; i++) {
        console.log(i);
        var row = document.createElement('tr'); // create a new table row
        
        for (var j=0; j< headers.length; j++){
            var cell = document.createElement('td');
            cell.innerHTML = json_response.data[i][headers[j]];
            row.appendChild(cell);
        }
        document.getElementById('tableBody').appendChild(row); // append the row to the table body
    }
  }
  

const sliders = document.querySelectorAll('.slider');
const sliderValues = Array.from(sliders).map(slider => {
    const sliderId = slider.id;
    const valueElement = document.getElementById(`${sliderId}-value`);
    return valueElement;
  });

sliders.forEach((slider, index) => {
slider.addEventListener('input', () => {
    let value;
    switch (slider.id) {
    case 'loudness':
        value = ((slider.value / 100) * (0.522 - (-47.07)) + (-47.07)).toFixed(2); 
        break;
    case 'tempo':
        value = ((slider.value/ 100) * (220.99)).toFixed(2);
        break;
    default:
        value = slider.value/100;
    }
    sliderValues[index].innerText = value;
});
});
