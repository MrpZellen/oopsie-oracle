import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = 'mongodb+srv://ben:T37PmGmfe7hqtW96@moviesreact.wvwftwa.mongodb.net/'
    if (!uri) {
      throw new Error("Problem with the env var.")
    }
    await mongoose.connect(uri, { dbName: 'oopsieOracle' })
    console.log('Is connected?', mongoose.connection.readyState)
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  } finally {
    return
  }
};

export default connectDB;