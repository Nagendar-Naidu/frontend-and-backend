import mongoose from "mongoose";

const signupSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    
})


let signupModel = mongoose.model('Signupcollection',signupSchema);

export default signupModel
