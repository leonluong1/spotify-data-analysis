const express = require('express');
const router = express.Router();
const path = require('path');

// Model page route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'model.html'));
});

module.exports = router;
