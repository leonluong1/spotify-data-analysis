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
    const acousticness = document.getElementById('acousticness').value-adjustor;
    const danceability = document.getElementById('danceability').value-adjustor;
    const energy = document.getElementById('energy').value-adjustor;
    const instrumentalness = document.getElementById('instrumentalness').value-adjustor;
    const liveness = document.getElementById('liveness').value-adjustor;
    const loudness = document.getElementById('loudness').value;
    const speechiness = document.getElementById('speechiness').value-adjustor;
    const tempo = document.getElementById('tempo').value;
    const valence = document.getElementById('valence').value-adjustor;
    const start_year = document.getElementById('years1').value;
    const end_year = document.getElementById('years2').value;
    console.log('sendQuery called');
    console.log(JSON.stringify({ acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, tempo, valence, start_year, end_year }));
    
    // Make AJAX request
    const response = await fetch('/buildQuery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, tempo, valence, start_year, end_year }),
    });
    console.log(response);
    // Get response from server
    const data = await response.json();
    console.log(data);
  }
  

