import express from "express" ; 
import User from "../models/user.js"

const router = express.Router() ; 

router.get('/signin' , (req , res) => {
    return res.render("signin") ; 
});

router.get('/signup' , (req , res) => {
    return res.render("signup") ; 
})

router.post('/signin' , async (req , res) => {
    const {email , password} = req.body ; 
    console.log("hello from signin");
    
    try {
        const token =  await User.matchPasswordAndGenerateToken(email ,password) ; 
        console.log(token);
        console.log(`user is ${JSON.stringify(req.user)}`);
        
        return res.cookie("token" , token).redirect('/') ;
        
    } catch (error) {
        return res.render("signin" , {
            error : 'Incorrect mail or password '
        } )
        
    }
   
    
})

router.post('/signup' , async (req, res) => {
    const {fullName  ,email , password } = req.body ;
    await User.create({
        fullName ,
        email , 
        password ,
    }); 

    return res.redirect("/") ; 
})


router.get('/logout' , (req ,res) => {
    res.clearCookie('token').redirect('/')
} )
export default router; 