import express from 'express';
import { adminRouter } from './routes/adminrouter.js';
import { userRouter } from './routes/router.js';
import { connectDB } from './routes/db.js';
const app = express();
import cors from 'cors'
import dotenv from 'dotenv'
    dotenv.config();

// let port = process.env.PORT;
//     console.log(process.env.MONGOURI)

    // connecting frontend
app.use(cors());
app.use(cors({origin: '*'}));

app.use(express.json());
express.urlencoded({extended:true});

app.use('/api/user',userRouter)

// app.use('/api/admin',adminRouter)


connectDB();
const port = 4000;

app.listen(port,()=>{
    console.log('server started at 4000 port')
})