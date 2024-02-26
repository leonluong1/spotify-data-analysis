const express = require('express');
const homeRouter = require('./routes/home.js');
const modelRouter = require('./routes/model.js');
const tableauRouter = require('./routes/dashboard.js');
const explorationRouter = require('./routes/exploration.js');
const aboutRouter = require('./routes/about.js');
const resourcesRouter = require('./routes/resources.js');
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
 
app.use(express.static(path.join(__dirname)));
app.use('/', homeRouter);
app.use('/model', modelRouter);
app.use('/dashboard', tableauRouter);
app.use('/exploration', explorationRouter);
app.use('/about', aboutRouter);
app.use('/resources', resourcesRouter);


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
  

app.use((err, req, res, next) => {
    console.log(req)
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

