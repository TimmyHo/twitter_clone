const path = require('path');
const express = require('express');

const app = express();

const publicDirPath = path.join(__dirname, '../public');
app.use(express.static(publicDirPath));

app.get('/api', (req, res) => {
  res.send({ info: 'Twitter Clone'});
});

module.exports = app;
