const express = require('express');
const router = express.Router();

// Tableau page route
router.get('/', (req, res) => {
  res.send('This is the tableau page');
});

module.exports = router;
