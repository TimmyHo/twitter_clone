const mongoose = require('mongoose');
const app = require('./app');


const start = async () => {
  const dbName = 'twitter-clone';
  let mongoDbUrl = process.env.MONGODB_URL || `mongodb://127.0.0.1:27017/${dbName}`;
  await mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
  });
}

start();
