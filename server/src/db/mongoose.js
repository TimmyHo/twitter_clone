const mongoose = require('mongoose');

const connect = async () => {
  const dbName = 'twitter-clone';
  let mongoDbUrl = process.env.MONGODB_URL || `mongodb://127.0.0.1:27017/${dbName}`;
  await mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
}

const disconnect = () => {
  mongoose.connection.close();
}

module.exports = { 
  connect,
  disconnect
};