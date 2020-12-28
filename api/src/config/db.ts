import mongoose from 'mongoose';
import config from './config';

const uri = config.mongo.uri;
const options = config.mongo.options;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, options);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
