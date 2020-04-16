// root route - must be done before deployment to heroku.  just deploy a basic index.html with bootstrap

const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

router.get('/start', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/startFamily.html'))
});

router.get('/member/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/viewMember.html'))
});
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

module.exports = router;