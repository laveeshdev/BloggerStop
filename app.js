import dotenv from 'dotenv';
dotenv.config({path : "./config.env"}) ;
import express from 'express' ; 
import path from "path";
import UserRoute from "./routes/user.js"
import BlogRoute from "./routes/blog.js"
import mongoose from 'mongoose';
import { checkForAuthenticationCookie } from './middlewares/authentication.js';
import cookieParser from 'cookie-parser';
import Blog from './models/blog.js';

const app = express() ; 


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/blogify" ;
const PORT = process.env.PORT || 5000 ;

mongoose.connect(mongoUrl).then(()=>{
    console.log("mongo db connected");
    
})

app.use(express.json()) ; 
app.use(express.urlencoded({extended : true })) ; 
app.use(cookieParser()) ; 
app.use(checkForAuthenticationCookie('token')) ; 
app.use(express.static(path.resolve("./public"))) ;


app.set('view engine' , 'ejs') ;
app.set("views" , path.resolve("./views")) ; 

app.get('/' , async (req, res)=>{
    const allBlogs = await Blog.find({}) ; 
    
    
    console.log(`req.user is ${req.user}`);
    console.log(`all blogs are  ${allBlogs}`);
    
    res.render("home" , {
        user : req.user ,
        blogs : allBlogs ,  

    } )
})

app.use("/user" , UserRoute) ; 
app.use("/blog" , BlogRoute) ; 
console.log(`the port is ${process.env.PORT}`);

app.listen(PORT , ()=>{
    console.log(`The server started at http://localhost:${PORT}/`);
    
})