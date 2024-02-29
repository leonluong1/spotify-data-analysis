function buildMiniQuery(acousticness, danceability, energy, liveness, loudness, speechiness, tempo, valence, year, duration){
    // let acousticness_slider = document.getElementById('acousticness');
    // let danceability_slider = document.getElementById('danceability');
    // let energy_slider = document.getElementById('energy');
    // let instrumentalness_slider = document.getElementById('instrumentalness');
    // let liveness_slider = document.getElementById('liveness');
    // let loudness_slider = document.getElementById('loudness');
    // let speechiness_slider = document.getElementById('speechiness');
    // let tempo_slider = document.getElementById('tempo');
    // let valence_slider = document.getElementById('valence');
    console.log('buildMiniQuery called');
    
    loudness = loudness -6.25;
    tempo = tempo - 23.5;
    const adjustor = .25;
    acousticness = acousticness - .125;
    danceability = danceability - .125;
    energy = energy - .125;
    liveness = liveness - .125;
    loudness = loudness - .125;
    speechiness = speechiness - .125;
    tempo = tempo - .125;
    valence = valence - .125;
    duration = duration - 1;

    
    let query = `SELECT * FROM song \
            WHERE acousticness BETWEEN ${(acousticness)} AND ${(acousticness + adjustor)} \
            AND danceability BETWEEN ${(danceability)} AND ${(danceability + adjustor)} \
            AND energy BETWEEN ${(energy)} AND ${(energy + adjustor)} \
            AND liveness BETWEEN ${(liveness)} AND ${(liveness + adjustor)} \
            AND loudness BETWEEN ${(loudness)} AND ${(loudness + 12.5)} \
            AND speechiness BETWEEN ${(speechiness)} AND ${(speechiness + adjustor)} \
            AND tempo BETWEEN ${(tempo)} AND ${(tempo + 47)} \
            AND valence BETWEEN ${(valence)} AND ${(valence + adjustor)} \
            AND duration_min BETWEEN ${(duration)} AND ${(duration + 2)}
            AND year BETWEEN ${year} AND ${year+10} ORDER BY popularity DESC; `

    
    return query;
    //console.log(acousticness, energy, instrumentalness, liveness, loudness, speechiness, tempo, valence, start_year, end_year);
    //console.log(loudness, tempo)
    console.log(query);
}

module.exports = {
    buildMiniQuery
  };