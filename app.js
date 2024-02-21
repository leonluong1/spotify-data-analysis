const express = require('express');
const homeRouter = require('./routes/home.js');
const modelRouter = require('./routes/model.js');
const tableauRouter = require('./routes/dashboard.js');
const explorationRouter = require('./routes/exploration.js');
const app = express();
const PORT = process.env.PORT || 3000;
const {
    querySongs
 } = require('./models/db.js');


app.use('/', homeRouter);
app.use('/model', modelRouter);
app.use('/dashboard', tableauRouter);
app.use('/exploration', explorationRouter);
app.use('/css', express.static('css', {
    setHeaders: (res) => {
        res.setHeader('Content-Type', 'text/css');
    },
}));

app.get('/api/songs', async (req, res) => {
    let query = await querySongs()
    console.log(res);
    res.json(query);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

