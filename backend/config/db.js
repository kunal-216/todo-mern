import mongoose from "mongoose";

export const connectDB = async() => {   
    await mongoose.connect(process.env.MONGO_URI, 
        {dbname: "backendapi",})
        .then(()=> console.log("Database Connected"))
        .catch((err)=> console.log(err));
}