const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_URI } = process.env;
console.log(`The Database is - ${MONGO_URI}`);

mongoose.set('strictQuery', true);

exports.connectDB = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Successfully connected to MongoDB database 🔥');
    })
    .catch((error) => {
      console.log('MongoDB database connection failed. Exiting now...😭');
      console.error(error);
    });
};

mongoose.connection.on('connected', () => {
  console.log('Mongoose Connected to DB');
});
mongoose.connection.on('error', (err) => {
  console.log(err.message);
});
mongoose.connection.on('disconnected', () => {
  console.log(
    'Successful termination of the program, mongoose Connection is disconnected'
  );
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
