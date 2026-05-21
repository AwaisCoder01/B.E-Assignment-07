import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const connectDB = async => {
    try {
    let con = mongoose.connect(process.env.MONGO_URI)
    console.log("DB Connected Successfully", con.connection.host);
    } catch (error) {
        console.log(error.message);
    }
     }