const express = require('express');
const router = express.Router();

// Model page route
router.get('/', (req, res) => {
  res.send('This is the model page');
});

module.exports = router;
