import mongoose from 'mongoose';

async function connectDB() {
  try {
    const URI: string = process.env.MONGO_URI || '';
    await mongoose.connect(URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

export default connectDB;