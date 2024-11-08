import mongoose from "mongoose";

const connectMongoDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected");
    } catch (error) {
        console.log(error.message);
    }
}

export default connectMongoDB;