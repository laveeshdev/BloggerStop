import express from 'express' ; 
import path from "path";
import UserRoute from "./routes/user.js"
import mongoose from 'mongoose';
import { checkForAuthenticationCookie } from './middlewares/authentication.js';
import cookieParser from 'cookie-parser';


const app = express() ; 
const PORT = 8000 ; 

mongoose.connect('mongodb://localhost:27017/blogify').then(()=>{
    console.log("mongo db connected");
    
})

app.use(express.json()) ; 
app.use(express.urlencoded({extended : true })) ; 
app.use(cookieParser()) ; 
// app.use(checkForAuthenticationCookie('token')) ; 

app.set('view engine' , 'ejs') ;
app.set("views" , path.resolve("./views")) ; 

app.get('/' , (req, res)=>{
    
    
    console.log(`req.user is ${req.user}`);
    
    res.render("home" , {
        user : req.user , 
    } )
})

app.use("/user" , UserRoute) ; 

app.listen(PORT , ()=>{
    console.log(`The server started at http://localhost:${PORT}/`);
    
})