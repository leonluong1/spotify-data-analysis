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


function buildQuery(){
    let acousticness_slider = document.getElementById('acousticness');
    let energy_slider = document.getElementById('energy');
    let instrumentalness_slider = document.getElementById('instrumentalness');
    let liveness_slider = document.getElementById('liveness');
    let loudness_slider = document.getElementById('loudness');
    let speechiness_slider = document.getElementById('speechiness');
    let tempo_slider = document.getElementById('tempo');
    let valence_slider = document.getElementById('valence');
    
    let acousticness = acousticness_slider.value;
    let energy = energy_slider.value;
    let instrumentalness = instrumentalness_slider.value;
    let liveness = liveness_slider.value;
    let loudness = loudness_slider.value;
    let speechiness = speechiness_slider.value;
    let tempo = tempo_slider.value;
    let valence = valence_slider.value;
    let start_year = select1.value;
    let end_year = select2.value;

    console.log(acousticness, energy, instrumentalness, liveness, loudness, speechiness, tempo, valence, start_year, end_year);
}