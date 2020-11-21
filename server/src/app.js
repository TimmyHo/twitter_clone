const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/usersRoutes');
const postsRoutes = require('./routes/postsRoutes');

const app = express();

const publicDirPath = path.join(__dirname, '../public');
app.use(express.static(publicDirPath));

app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.send({ info: 'Twitter Clone'});
});

app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);

module.exports = app;
