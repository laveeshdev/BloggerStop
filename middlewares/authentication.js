import { json } from "express";
import { validateToken } from "../services/authentication.js";

function checkForAuthenticationCookie(cookieName){
    return (req , res , next) => {
      
       
            const tokenCookie = req.cookies[cookieName] ; 
            
          
            if(!tokenCookie){
                return next() ; 
            }
            const tokenCookieValue = tokenCookie.token ; 
            console.log(`tokenCookieValue is ${tokenCookieValue}`);
            
        

        
        
        

        try {
            const userPayload = validateToken(tokenCookieValue) ; 
            req.user = userPayload ; 
             
            
        } catch (err) {
            console.log("some error in middleware ");
            console.log(err);
            
            
        }
         return next() ; 


    } ;
}

export {
    checkForAuthenticationCookie , 
}