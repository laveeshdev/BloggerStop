import { Schema , model } from "mongoose";
import {createHmac , randomBytes} from "crypto" ; 
import {createTokenForUser} from "../services/authentication.js"

const userSchema = new Schema({
    fullName : {
        type : String, 
        required : true , 
    }, 
    email : {
        type : String , 
        required : true , 
        unique : true , 
    },
    salt : {
        type : String ,
        

    } , 
    password : {
        type : String ,
        required : true , 

    } , 
    profileImageURL : {
        type : String , 
        default : "./public/images/user.png" ,

    } ,
    role : {
        type : String , 
        enum : ["USER" , "ADMIN"] , 
        default : "USER" ,
    }


},
{
    timestamps : true , 
})

// we want to something before saving a user , a set of predefined function to reun everytime 

userSchema.pre('save' , function (next){
    const user = this ; 
    if(!user.isModified("password")) return ; 

    const salt = randomBytes(16).toString() ;
    const hashedPassword = createHmac('sha256' , salt)
    .update(user.password)
    .digest("hex") ; 

    this.salt = salt ; 
    this.password = hashedPassword ; 


    next() ; 



} )

userSchema.static('matchPasswordAndGenerateToken' , async function(email, password) {
    const user = await this.findOne({email}) ; 
    console.log(user);
    
    if(!user) {
        throw new Error("User not found !");
               
    }
    const salt = user.salt ;  
    const hashedPassword = user.password ; 
    console.log(`the stored hash ${hashedPassword}`);
    
    //redo hashing with user provided passwoed 
    const newHashedPassword = createHmac('sha256' , salt)
    .update(password)
    .digest("hex") ; 
    console.log((`the login hash ${newHashedPassword}`));
    
    if(hashedPassword !== newHashedPassword){
        throw new Error("Incorrect Password ");
        
    }
    const token = createTokenForUser(user) ; 

    return {token} ; 
})

const User = model('user' , userSchema) ; 

export default User ; 