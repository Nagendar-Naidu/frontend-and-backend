import express from "express";
import jwt from 'jsonwebtoken';
import signupModel from "../models/signupModel.js";
import bcrypt from "bcrypt";

const loginFunc = async (req,res)=>{
        const {email,password} = req.body;
        try{
            const exists = await signupModel.findOne({email});
            if(!exists){
                //login functionality
                res.json({success:false,message:'please register first'})
          
            }  
            else{
                let match = await bcrypt.compare(password,exists.password);
                if (match){
                  //login process
                  res.json({success:false,message:'Successful Login'})
                }
                else{
                  res.json({success:false,message:'Password is incorrect'})
                }
            }
        }
        catch(e){
            console.log(e);
        }
}

const signupFunc = async(req,res)=>{
    const {name,email,password,gender} = req.body;
    try{
        const exists = await signupModel.findOne({email});
       if(exists){
        res.json({success:false,message:"user already exists,please register with another email"})
       }
       else{

        // paSsword hashing
       let salt = await bcrypt.genSalt(10);
       let hashedpassword = await bcrypt.hash(password,salt);

        const newUser = new signupModel({
            name:name,
            email:email,
            password:hashedpassword,
            gender:gender
        });
        const user = await newUser.save();

       let id =  user._id;

       let token = jwt.sign({id},process.env.SECRETKEY);
       console.log(token);

       
        res.json({success:true,message:'user registered successfully',token:token})
       }
    }
    catch(e){
        console.log(e)
    }
}

const addTocart = async(req,res)=>{
    console.log('added to cart');
    res.json({success:true,message:'added to cart successfully'})
}

const authmiddleware = async (req,res,next)=>{
    try{
   const {token} = req.headers;

   if(!token){
       res.json({success:false,message:"not authorized user, login again"})
       }
   else{
     let decodedtoken = jwt.verify(token,process.env.SECRETKEY);
     req.body.userId = decodedtoken.id;
     next();
   }
}
   catch(error){
    console.log(error);
    res.json({success:false,message:'error'})
   }

}
export{signupFunc,loginFunc,addTocart,authmiddleware}