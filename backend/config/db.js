import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
        const conn =  mongoose.connect(process.env.MONGO_URL,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })

        console.log(`MongoDB Connected`);
    } catch (error) {
        console.log(`Error : ${error}`);
        process.exit()
        
    }
}

export default connectDB;