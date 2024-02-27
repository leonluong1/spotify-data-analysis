function goto (path){
    console.log(path);
    window.location.href = path;
}

function hover (){

}

// "acousticness" float,
//     "danceability" float,
//     "energy" float,
//     "instrumentalness" float,
//     "key" integer,
//     "liveness" float,
//     "loudness" float,
//     "mode" integer,
//     "speechiness" float,
//     "tempo" float,
//     "time_signature" integer,
//     "valence" float

let thumb = document.getElementById('slider-thumb');
let container = document.querySelector('.slider-container');

var select1 = document.getElementById('years1');
var select2 = document.getElementById('years2');

var years = Array.from({length: 2023-1986+1}, (_, i) => 1986 + i);

years.forEach(year => {
    var option1 = document.createElement('option');
    var option2 = document.createElement('option');
    option1.text = year;
    option2.text = year;
    select1.add(option1);
    select2.add(option2);
});

select1.addEventListener('change', function() {
    var year1 = parseInt(select1.value);
    var year2 = parseInt(select2.value);
    if (year2 < year1) {
        select2.innerHTML = '';
        var selectedYears = Array.from({length: 2023-year1+1}, (_, i) => year1 + i);
        selectedYears.forEach(year => {
            var option = document.createElement('option');
            option.text = year;
            select2.add(option);    
        });
    }
});

select2.addEventListener('change', function() {
    var year1 = parseInt(select1.value);
    var year2 = parseInt(select2.value);
    if (year2 < year1) {
        select1.innerHTML = '';
        var selectedYears = Array.from({length: 2023-year2+1}, (_, i) => year2 + i);
        selectedYears.forEach(year => {
            var option = document.createElement('option');
            option.text = year;
            select1.add(option);
        });
    }
});

async function sendQuery() {
    // Collect slider values
    const adjustor = 25;
    // const acousticness = document.getElementById('acousticness').value-adjustor;
    // const danceability = document.getElementById('danceability').value-adjustor;
    // const energy = document.getElementById('energy').value-adjustor;
    // const instrumentalness = document.getElementById('instrumentalness').value-adjustor;
    // const liveness = document.getElementById('liveness').value-adjustor;
    // const loudness = document.getElementById('loudness').value;
    // const speechiness = document.getElementById('speechiness').value-adjustor;
    // const tempo = document.getElementById('tempo').value;
    // const valence = document.getElementById('valence').value-adjustor;
    // const start_year = document.getElementById('years1').value;
    // const end_year = document.getElementById('years2').value;

    const acousticness = 45;
    const danceability = 15;
    const energy = -4;
    const instrumentalness = -24;
    const liveness = -13;
    const loudness = 71;
    const speechiness = -22;
    const tempo = 77;
    const valence = 1;
    const start_year = 1986;
    const end_year = 2023;
    console.log('sendQuery called');
    console.log(JSON.stringify({ acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, tempo, valence, start_year, end_year }));
    
    // Make AJAX request
    const response = await fetch('/buildQuery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, tempo, valence, start_year, end_year }),
    //   body: {
    //     "acousticness": 45,
    //     "danceability": 15,
    //     "energy": -4,
    //     "instrumentalness": -24,
    //     "liveness": -13,
    //     "loudness": "71",
    //     "speechiness": -22,
    //     "tempo": "77",
    //     "valence": 1,
    //     "start_year": "1986",
    //     "end_year": "2023"
    //   }
    });
    console.log(response);
    // Get response from server
    const json_response = await response.json();
    console.log(json_response.data);

    //const outputElement = document.getElementById('data');
    //outputElement.textContent = JSON.stringify(data);
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