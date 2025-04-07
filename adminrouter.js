import express from 'express';
const adminRouter = express.Router();


adminRouter.post('/edituser',(req,res)=>{
    res.send('admin route')
})


export {adminRouter}