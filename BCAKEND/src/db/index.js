import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {

    try {
        
        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
        console.log(`Database is connected >> DB HOST ${connectionInstance.connection.host}`)

    } catch (error) {
        
        console.log("Database Connection Failed DB/index ", error)
        process.exit(1);
    }
}

export default connectDB;