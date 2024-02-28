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
    
    loudness = ((loudness / 100) * (0.522 - (-47.07)) + (-47.07)) -12.5;
    console.log(loudness);
    tempo = (tempo/ 100) * (220.99) - 55.2475;
    const adjustor = 50;
    let tempo_buffer = (50/ 100) * (220.99);
    let loudness_buffer = (10 / 100) * (0.522 - (-47.07)) + (-47.07);
    console.log(loudness_buffer);

    let query = `SELECT * FROM song \
            WHERE acousticness BETWEEN ${(acousticness) / 100} AND ${(acousticness + adjustor) / 100} \
            AND danceability BETWEEN ${(danceability) / 100} AND ${(danceability + adjustor) / 100} \
            AND energy BETWEEN ${(energy) / 100} AND ${(energy + adjustor) / 100} \
            AND instrumentalness BETWEEN ${(instrumentalness) / 100} AND ${(instrumentalness + adjustor) / 100} \
            AND liveness BETWEEN ${(liveness) / 100} AND ${(liveness + adjustor) / 100} \
            AND loudness BETWEEN ${(loudness)} AND ${(loudness + 25)} \
            AND speechiness BETWEEN ${(speechiness) / 100} AND ${(speechiness + adjustor) / 100} \
            AND tempo BETWEEN ${(tempo)} AND ${(tempo + tempo_buffer)} \
            AND valence BETWEEN ${(valence) / 100} AND ${(valence + adjustor) / 100} \
            AND year BETWEEN ${start_year} AND ${end_year} ORDER BY popularity DESC; `

    
    return query;
    //console.log(acousticness, energy, instrumentalness, liveness, loudness, speechiness, tempo, valence, start_year, end_year);
    //console.log(loudness, tempo)
    console.log(query);
}

module.exports = {
    buildQuery
  };