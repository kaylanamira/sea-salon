import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error('Please define the MONGO_URL environment variable inside .env');
}
const conn = {};

async function connectToDb() {
    try {
        if (conn.isConnected){
            return;
        }
        const db = await mongoose.connect(MONGO_URL);
        conn.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log(error);
    }
} 

export default connectToDb;