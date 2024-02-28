const express = require('express');
const router = express.Router();
const path = require('path');

// Resources page route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'resources.html'));
});

module.exports = router;
