const express = require('express');
const router = express.Router();
const path = require('path');

// Playlists page route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'playlists.html'));
});

module.exports = router;
