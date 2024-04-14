import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log(`Database in-use: ${mongoose.connection.name}`);
  } catch (error) {
    console.log(error);
  }
}
