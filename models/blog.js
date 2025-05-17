import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    title : {
        type : String, 
        required : true , 
    }, 
    body : {
        type : String , 
        required : true , 
        unique : true , 
    },
    coverImageURL : {
        type : String  , 
        required : false ,
    } , 
    createdBy : {
        type : Schema.Types.ObjectId , 
        ref : "user"  ,
        required : true ,
    }  
} ,
    {
        timestamps : true ,
    }
)


const Blog  = model('blog' , blogSchema) 

export default Blog  ; 

