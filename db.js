import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://nagendarnaidu:nagendarnaidu@cluster0.gggsbdu.mongodb.net/databasebackend?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
     console.log('Database connected')
    })
}