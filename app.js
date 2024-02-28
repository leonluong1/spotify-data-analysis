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
app.use(morgan('combined')); // Use the 'combined' log format for logging




/*app.use('/images', express.static('images'));
app.use('/static', express.static('static'));
app.use('/', express.static('css', {
    setHeaders: (res) => {
        res.setHeader('Content-Type', 'text/css');
    },
}));*/


app.get('/api/songs', async (req, res) => {
    let query = await querySongs()
    console.log(res);
    res.json(query);
});

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

