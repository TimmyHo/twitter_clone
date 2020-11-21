const path = require('path');
const express = require('express');

const usersRoutes = require('./routes/usersRoutes');

const app = express();

const publicDirPath = path.join(__dirname, '../public');
app.use(express.static(publicDirPath));

app.get('/api', (req, res) => {
  res.send({ info: 'Twitter Clone'});
});

app.use('/api/users', usersRoutes);

module.exports = app;
