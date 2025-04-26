import { json } from "express";
import { validateToken } from "../services/authentication.js";

function checkForAuthenticationCookie(cookieName){
    return (req , res , next) => {
        try {
            const tokenCookieValue = req.cookies[cookieName].token ; 
            console.log(`tokenCookieValue is ${tokenCookieValue}`);
            
        } catch (err) {
            return res.redirect("/user/signin");
            // console.log(err);
            
            
        }

        
        
        if(!tokenCookieValue){
            next() ; 
        }

        try {
            const userPayload = validateToken(tokenCookieValue) ; 
            req.user = userPayload ; 
             
            
        } catch (err) {
            console.log("some error in middleware ");
            console.log(err);
            
            
        }
        next() ; 


    } ;
}

export {
    checkForAuthenticationCookie , 
}