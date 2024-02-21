const path = require('path');
require('dotenv').config({
    override: true,
    path: path.join(__dirname, 'models/development.env')
});
const {Pool, Client} = require('pg');

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: 'spotify_db',
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

// (async () => {
//     try{
//         const {rows} = await pool.query('SELECT current_user');
//         const currentUser = rows[0]['current_user'];
//         console.log(currentUser);
//     }catch (err){
//         console.log(err);
//     }
// })();
song_query = 'SELECT * FROM song';

// (async () => {
//     try{
//         const {rows} = await pool.query('SELECT * FROM song');
//         //const currentUser = rows[0]['current_user'];
//         console.log(rows);
//     }catch (err){
//         console.log(err);
//     }
// })();

async function querySongs(query=song_query) {
    let response = await pool.query(query);
    return response.rows;
}

module.exports = {querySongs};