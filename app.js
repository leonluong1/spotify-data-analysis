const express = require('express');
const homeRouter = require('./routes/home.js');
const modelRouter = require('./routes/model.js');
const tableauRouter = require('./routes/dashboard.js');
const explorationRouter = require('./routes/exploration.js');
const aboutRouter = require('./routes/about.js');
const resourcesRouter = require('./routes/resources.js');
const playlistsRouter = require('./routes/playlists.js');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

const {
    querySongs,
    querySliders
 } = require('./models/db.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const {
    buildQuery
 } = require('./static/js/buildQuery.js');
const { PythonShell } = require('python-shell');
const morgan = require('morgan');
const { spawn } = require('child_process');


 
app.use(express.static(path.join(__dirname)));
app.use('/', homeRouter);
app.use('/model', modelRouter);
app.use('/dashboard', tableauRouter);
app.use('/exploration', explorationRouter);
app.use('/about', aboutRouter);
app.use('/resources', resourcesRouter);
app.use('/playlists', playlistsRouter);



const columns = "track_name, album_name, principal_artist_name, artist_genres, principal_artist_followers, duration_ms, duration_min, popularity,\
popularity, acousticness, danceability, energy, instrumentalness, key, liveness, loudness, mode, speechiness, tempo, valence, year"
const names = ["ahlden", "daniel", "immanuel", "martin", "leon", "brian"];
const ahlden =  [12, 7911, 9976, 303, 9739, 676, 1365, 319, 6155, 616];
const daniel =  [314, 507, 6134, 347, 4519, 2514, 2203, 9357, 5892, 3281];
const immanuel =  [5209, 8838, 9497, 9708, 10883, 8806, 8871, 8978, 9104, 9304];
const martin =  [18, 29, 79, 85, 4945, 9412, 9411, 10471, 10478, 10496];
const leon =  [5212, 5528, 5559, 2415, 4684, 8518, 7611, 4336, 8032, 10633];
const brian =  [2116, 8737, 4318, 5228, 4027, 3519, 2594, 4016, 4320, 798];
const playlists = [ahlden, daniel, immanuel, martin, leon, brian]


for (let i in names) {
    app.get(`/songs/${names[i]}`, async (req, res) => {
        let query = await querySongs(`select ${columns}  from song where id in ${'(' + playlists[i].join(', ') + ')'}`);
        res.json(query);
      });
}

app.post('/buildQuery', async (req, res) => {
    console.log(req);
    console.log('gets to app.js');
    const { acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, tempo, valence, start_year, end_year } = req.body;
  
    const query = buildQuery(acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, tempo, valence, start_year, end_year);
    let data = await querySliders(query);
    res.json({ data });
  });

const modelPath = './regression_model.joblib';

app.post('/predict', (req, res) => {
    const data = req.body;
    const values = Object.values(data);
    const input = values.join(' ');
    console.log(`server side ${input}`);
    
    const pythonProcess = spawn('python', ['predict.py', input]);

    let prediction = '';
    let errors = '';
    let timeoutMs = 15000;

    const timeout = setTimeout(() => {
        console.log('Timeout reached. Aborting request.');
        pythonProcess.kill('SIGINT');
      }, timeoutMs);      

    pythonProcess.stdout.on('data', (data) => {
        // Capture the prediction
        prediction += data.toString();
    });

    // Capture error messages from the Python script
    pythonProcess.stderr.on('data', (data) => {
        errors += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.log(code);
            console.error('Prediction process exited with non-zero code');
            console.error('Errors from Python script:', errors); // Log the error messages
            res.status(500).send('Error occurred');
        } else {
            console.log('Prediction process finished successfully');
            // Send the prediction back in the response
            res.send(prediction);
        }
        pythonProcess.kill();
    });
});
  

app.use((err, req, res, next) => {
    console.log(req)
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


