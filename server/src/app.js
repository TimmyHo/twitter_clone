const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

const publicDirPath = path.join(__dirname, '../public');
const publicDirHtmlPath = path.join(publicDirPath, 'html');
app.use(express.static(publicDirPath));


app.get('/api', (req, res) => {
  res.send({ info: 'Twitter Clone'});
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});