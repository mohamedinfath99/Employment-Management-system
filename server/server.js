import app from './app.js'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import colors from 'colors';

dotenv.config();
mongoose.set('strictQuery', true);



const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)


const connect = async () => {
    try {
        await mongoose.connect(DB);
        console.log("database is connected!".bgGreen.black);
    } 
    catch (error) {
        throw(error);
    }
}



mongoose.connection.on("Disconnected", () => {
    console.log("MongoDb is Disconnected".bgCyan.black);
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB is connected".bgCyan.black);
});



const port = 5000;
app.listen(port, () => {
    connect()
    console.log('backend server is running!'.bgMagenta.black);
})