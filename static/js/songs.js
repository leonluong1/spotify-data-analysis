

//let url = "https://spotify-data-analysis.onrender.com";
let url = "http://localhost:3000";

// Columns that are queried from PostgreSQL
let columns = "track_name, album_name, principal_artist_name, artist_genres, principal_artist_followers, duration_ms, duration_min, popularity,\
acousticness, danceability, energy, instrumentalness, key, liveness, loudness, mode, speechiness, tempo, valence, year";

let tcols = ["Track Name", "Album Name", "Artist Name", "Genres", "Followers", "Duration (min)", "Popularity", "Year"];

let tcols2 = ["track_name", "album_name", "principal_artist_name", "artist_genres", "principal_artist_followers", "duration_min", "popularity", "year"];

let tcols3 = ["Favorite Decade", "Favorite Genre", "Avg. Followers", "Avg. Popularity", "Avg. Danceability", "Avg. Energy", "Avg. Loudness", "Avg. Speechiness", "Avg. Tempo"];

let names = ["ahlden", "daniel", "immanuel", "martin", "leon", "brian"];

// Function to insert playlist songs into the playlists web page
function postPlaylist(name) {
fetch(`${url}/songs/${name}`)
  .then(response => response.json())
  .then(data => {
    // Creating header for first table
    let section = d3.select(`#${name} .playlist-section`);
    let table = section.append('table');
    let theadr = table.append('thead').append('tr');
    for (i in tcols) {
        theadr.append('th').text(tcols[i]);
    }

    // Creating header for second table
    let decadeCount = {};
    let genreCount = {};
    let section2 = d3.select(`#${name} .playlist-section2`);
    let table2 = section2.append('table');
    let theadr2 = table2.append('thead').append('tr');
    for (i in tcols3) {
        theadr2.append('th').text(tcols3[i]);
    }

    let followerSum = 0;
    let popularSum = 0;
    let danceSum = 0;
    let energySum = 0;
    let loudSum = 0;
    let speechSum = 0;
    let tempoSum = 0;
    let songTotal = data.length;

    data.forEach(song => { 
        // Creating first table body and counting specific metrics to aggregate later
        let tbodyr = table.append('tbody').append('tr').attr("class", "playlist-row");
        for (let i in tcols2) {
            if (tcols2[i] == 'artist_genres') {
                let row = tbodyr.append('th');
                let genres = song[tcols2[i]].split(';');
                row.attr('class', 'genre');
                for (let n in genres) {
                    row.append('div').text(genres[n]);
                    if (genres[n] in genreCount) {
                        genreCount[genres[n]] += 1;
                    }
                    else {
                        genreCount[genres[n]] = 1;
                    }
                }
            }
            else if (tcols2[i] == 'duration_min'){
                tbodyr.append('th').text(parseFloat(song[tcols2[i]]).toFixed(2));
            }
            else {
                tbodyr.append('th').text(song[tcols2[i]]);
            }
        }

        if (Math.round(song.year/10)*10 in decadeCount) {
            decadeCount[Math.round(song.year/10)*10] += 1;
        }
        else {
            decadeCount[Math.round(song.year/10)*10] = 1;
        }

        // Calculating metric sums per playlist
        followerSum += song.principal_artist_followers;
        popularSum += song.popularity;
        danceSum += song.danceability;
        energySum += song.energy;
        loudSum += song.loudness;
        speechSum += song.speechiness;
        tempoSum += song.tempo;
    })

    // Finding the max decade number
    let maxDecadeCount = 0;
    let maxDecade = [];

    for (const key in decadeCount) {
        if (decadeCount[key] > maxDecadeCount) {
            maxDecadeCount = decadeCount[key];
            maxDecade.length = 0;
            maxDecade.push(key);
        }
        else if (decadeCount[key] == maxDecadeCount) {
            maxDecade.push(key);
        }
    }


    // Finding the max genre number
    let maxGenreCount = 0;
    let maxGenre = [];

    for (const key in genreCount) {
        if (genreCount[key] > maxGenreCount) {
            maxGenreCount = genreCount[key];
            maxGenre.length = 0;
            maxGenre.push(key);
        }
        else if (genreCount[key] == maxGenreCount) {
            maxGenre.push(key);
        }
    }


    let tbodyr2 = table2.append('tbody').append('tr').attr("class", "playlist-row");
    tbodyr2.append('th').text(maxDecade.join()).attr("class", colorDecade(maxDecade[0]));
    tbodyr2.append('th').text(maxGenre.join()).attr("class", "teal");
    tbodyr2.append('th').text((followerSum/songTotal).toFixed(0)).attr("class", colorFollowers(followerSum/songTotal));
    tbodyr2.append('th').text((popularSum/songTotal).toFixed(1)).attr("class", colorPopularity(popularSum/songTotal));
    tbodyr2.append('th').text((danceSum/songTotal).toFixed(2)).attr("class", colorStandard(danceSum/songTotal));
    tbodyr2.append('th').text((energySum/songTotal).toFixed(2)).attr("class", colorStandard(energySum/songTotal));;
    tbodyr2.append('th').text((loudSum/songTotal).toFixed(2)).attr("class", colorLoud(loudSum/songTotal));;
    tbodyr2.append('th').text((speechSum/songTotal).toFixed(2)).attr("class", colorStandard(speechSum/songTotal));;
    tbodyr2.append('th').text((tempoSum/songTotal).toFixed(2)).attr("class", colorTempo(tempoSum/songTotal));;
    
    let config = {
        displayModeBar: false
      };

    let sortedArray = Object.entries(decadeCount).sort((a,b) => a[0] - b[0]);

    let sortedDecades = Object.fromEntries(sortedArray);

    let decadesChartData = {
      x: Object.keys(sortedDecades),
      y: Object.values(sortedDecades),
      type: 'bar',
      marker: {
        color: ['#196bbd', '#3486d9', '#4f99e3', '#68a8e8', '#9ac8f5']
      }
    };
  
    let decadesChartLayout = {
        height: 450,
        widgth: 450,
        margin: { t: 55, b: 37, l: 30, r: 10 },
        paper_bgcolor: '#f2f2f2',
        title: {
            text: 'Favorite Decades Breakdown',
            font: {
                size: 24
            }
        },
        xaxis: {
          title: 'Decades',
          tickmode: 'linear',
          dtick: 10,
        },
        yaxis: {
            title: 'Number of Songs',
            tickmode: 'linear',
            dtick: 1,
        }
    };
  
    // Render the Plotly decades chart
    let decadesDiv = document.querySelector(`#${name} .decades-bar-chart`);
    Plotly.newPlot(decadesDiv, [decadesChartData], decadesChartLayout, config);
    
    let sortedArray1 = Object.entries(genreCount).sort((a,b) => b[1] - a[1]).slice(0, 5);

    let sortedGenres = Object.fromEntries(sortedArray1);

    let genreChartData = {
        x: Object.keys(sortedGenres),
        y: Object.values(sortedGenres),
        type: 'bar',
        marker: {
            color: ['#0bb005', '#20d119', '#3bed34', '#7bf777', '#b0f59f']
        }
    };
    
    let genreChartLayout = {
        height: 450,
        widgth: 450,
        margin: { t: 55, b: 77, l: 30, r: 10 },
        paper_bgcolor: '#f2f2f2',
        title: {
            text: 'Top 5 Genres Chart',
            font: {
                size: 24
            }
        },
        tickangle: -75,
        xaxis: {
            title: 'Genres',
        },
        yaxis: {
            title: 'Number of Songs',
            tickmode: 'linear',
            dtick: 1,
        }
    };
    
      // Render the Plotly genre chart
      let genreDiv = document.querySelector(`#${name} .genre-bar-chart`);
      Plotly.newPlot(genreDiv, [genreChartData], genreChartLayout, config);

  })
  .catch(error => console.error('Error:', error));
}

for (let i in names) {
    postPlaylist(names[i]);
}


function colorDecade(decade) {
    if (decade <= 1970) {
        return "pink";
    }
    else if (decade <= 2000) {
        return "purple";
    }
    else {
        return "blue";
    }
}

function colorFollowers(num) {
    if (num <= 1000000) {
        return "red";
    }
    else if (num <= 5000000) {
        return "orange";
    }
    else if (num <= 10000000) {
        return "yellow";
    }
    else {
        return "green";
    }
}

function colorPopularity(num) {
    if (num <= 25) {
        return "red";
    }
    else if (num <= 50) {
        return "orange";
    }
    else if (num <= 75) {
        return "yellow";
    }
    else {
        return "green";
    }
}

function colorStandard(num) {
    if (num <= .25) {
        return "red";
    }
    else if (num <= .50) {
        return "orange";
    }
    else if (num <= .75) {
        return "yellow";
    }
    else {
        return "green";
    }
}

function colorLoud(num) {
    if (num <= -30) {
        return "red";
    }
    else if (num <= -15) {
        return "orange";
    }
    else if (num <= -10) {
        return "yellow";
    }
    else {
        return "green";
    }
}

function colorTempo(num) {
    if (num <= 88) {
        return "red";
    }
    else if (num <= 115) {
        return "orange";
    }
    else if (num <= 143) {
        return "yellow";
    }
    else {
        return "green";
    }
}