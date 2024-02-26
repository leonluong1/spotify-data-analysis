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

module.exports = {
    buildQuery
  };