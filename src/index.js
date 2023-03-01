import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from "cors";
import userRoutes from './Route/userRoute.js';
import newsRoute from './Route/newsRoute.js';
import eventRoute from './Route/eventRoute.js';
import roomAdmin from './Route/AdminRoute.js';
import bookUser from './Route/bookUseRoute.js'
dotenv.config();
const {PORT} = process.env;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
mongoose.Promise = global.Promise;
mongoose.set("strictQuery",true);
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log("Succesfully connected to the database");
}).catch(err =>{
    console.log('something went wrong',err);
    process.exit();
});
app.listen(PORT,() =>{
    console.log(`server is listening on port ${PORT}...`);
})

// routes
app.use('/user',userRoutes);
app.use('/news',newsRoute);
app.use('/events',eventRoute);
app.use('/admin',roomAdmin);
app.use('/userbooking',bookUser);

app.get('/', (req, res) => {
    return res.json({message: "Welcome  I am testing again"});
 });
 export default app;