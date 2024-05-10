import mongoose from 'mongoose';

let isConnected = false;
let db = null;

export const connectMongoDB = async () => {
  try {
    if (!isConnected) {
      db = await mongoose.connect(process.env.MONGO_CONNECT);
      isConnected = true;
      console.log('Connected to MongoDB');
    }
    return db;
  } catch (error) {
    console.log('Error connecting to MongoDB', error);
    throw error;
  }
};
