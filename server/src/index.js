const db = require('./db/mongoose');
const app = require('./app');

const start = async () => {
  await db.connect();

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
  });
}

start();
