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
    const acousticness = document.getElementById('acousticness').value-5;
    const danceability = document.getElementById('danceability').value-5;
    const energy = document.getElementById('energy').value-5;
    const instrumentalness = document.getElementById('instrumentalness').value-5;
    const liveness = document.getElementById('liveness').value-5;
    const loudness = document.getElementById('loudness').value;
    const speechiness = document.getElementById('speechiness').value-5;
    const tempo = document.getElementById('tempo').value;
    const valence = document.getElementById('valence').value-5;
    const start_year = document.getElementById('years1').value-5;
    const end_year = document.getElementById('years2').value-5;
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
  

function buildQuery(acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, tempo, valence, start_year, end_year){
    // let acousticness_slider = document.getElementById('acousticness');
    // let danceability_slider = document.getElementById('danceability');
    // let energy_slider = document.getElementById('energy');
    // let instrumentalness_slider = document.getElementById('instrumentalness');
    // let liveness_slider = document.getElementById('liveness');
    // let loudness_slider = document.getElementById('loudness');
    // let speechiness_slider = document.getElementById('speechiness');
    // let tempo_slider = document.getElementById('tempo');
    // let valence_slider = document.getElementById('valence');
    console.log('buildQuery called');
    
    loudness = (loudness / 100) * (0.522 - (-47.07)) + (-47.07)
    tempo = (tempo/ 100) * (220.99);

    let tempo_buffer = (5/ 100) * (220.99);
    let loudness_buffer = (5 / 100) * (0.522 - (-47.07)) + (-47.07);

    let query = `SELECT * FROM song \
            WHERE acousticness BETWEEN ${(acousticness) / 100} AND ${(acousticness + 10) / 100} \
            AND danceability BETWEEN ${(danceability) / 100} AND ${(danceability + 10) / 100} \
            AND energy BETWEEN ${(energy) / 100} AND ${(energy + 10) / 100} \
            AND instrumentalness BETWEEN ${(instrumentalness) / 100} AND ${(instrumentalness + 10) / 100} \
            AND liveness BETWEEN ${(liveness) / 100} AND ${(liveness + 10) / 100} \
            AND loudness BETWEEN ${(loudness - loudness_buffer) / 100} AND ${(loudness + loudness_buffer) / 100} \
            AND speechiness BETWEEN ${(speechiness) / 100} AND ${(speechiness + 10) / 100} \
            AND tempo BETWEEN ${(tempo) / 100} AND ${(tempo + tempo_buffer) / 100} \
            AND valence BETWEEN ${(valence) / 100} AND ${(valence + 10) / 100} \
            AND year BETWEEN ${start_year} AND ${end_year};`


    return query;
    //console.log(acousticness, energy, instrumentalness, liveness, loudness, speechiness, tempo, valence, start_year, end_year);
    //console.log(loudness, tempo)
    console.log(query);
}

