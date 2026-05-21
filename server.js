import { app } from "./src/app.js";
import dotenv from "dotenv"
import { connectDB } from "./src/config/db.js";

dotenv.config()

const PORT = process.env.PORT || 6500

app.listen(PORT, ()=>{
    console.log(`Server is listneing on PORT number ${PORT}`);
    connectDB();
})