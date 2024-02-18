const express = require('express');
const homeRouter = require('./home.js');
const modelRouter = require('./model.js');
const tableauRouter = require('./dashboard.js');
const explorationRouter = require('./exploration.js');
const app = express();
const PORT = process.env.PORT || 3000;
const {
    querySongs
 } = require('./db.js');


app.use('/', homeRouter);
app.use('/model', modelRouter);
app.use('/dashboard', tableauRouter);
app.use('/exploration', explorationRouter);

app.get('/api/songs', async (req, res) => {
    let query = await querySongs()
    console.log(res);
    res.json(query);
});


// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

