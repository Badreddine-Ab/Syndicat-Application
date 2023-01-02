import mongoose from 'mongoose'
import 'dotenv/config';

export const connectDatabase = async() => {
    await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
};
