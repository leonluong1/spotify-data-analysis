const express = require('express');
const router = express.Router();
const path = require('path');

// Dashboard page route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'dashboard.html'));
});

module.exports = router;
