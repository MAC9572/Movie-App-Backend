import mongoose from "mongoose";

export const connectDB = async ()=>{

    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB Connected')
    }
    catch(error){
    console.log(error , "DB not Connected")
    }

}

