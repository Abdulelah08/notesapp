const mongoose = require('mongoose')

async function connectToDb() {
    try {
      await mongoose.connect('mongodb://0.0.0.0:27017/test_db', {
        // useNewUrlParser: true,
      });
      console.log('Connected to database successfully!');
    } catch (err) {
      console.log(err);
    }
  }
  connectToDb();