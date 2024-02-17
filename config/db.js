const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.DATABASE_LOCAL)
        console.log(`mongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error : ${error}`);
        process.exit(1)
    }
}

module.exports = connectDB