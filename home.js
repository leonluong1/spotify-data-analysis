const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.send('This is the home page');
});

module.exports = router;
