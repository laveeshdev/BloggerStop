import { Router } from "express";
import multer from "multer" ;
import path from "path" ;  
import Blog from "../models/blog.js"
const router = Router() ; 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null , fileName) 
      
    }
  }) ;
  
  const upload = multer({ storage: storage })



router.get('/add-new' , (req,res)=>{
    // console.log("the req is : ");
    
    // console.dir(req.user, { depth: null });

    return res.render('addBlog' , {
        user : req.user ,

    })

}).post('/add-new' ,upload.single('coverImage') ,  async (req , res)=> {
    // console.log(req.body) ; 
    // console.log(req.file) ; 
    console.log(`creted by ${req.user._id}`);
    
    const { title , body} = req.body ; 

    const blog = await Blog.create({
        body , 
        title , 
        createdBy : req.user._id , 
        coverImageURL : `/uploads/${req.file.filename}` ,
    }) ; 
    
    return res.redirect(`/blog/${blog._id}`) ;

})
router.get("/:id" , async (req , res) =>{
    console.log(`creted by ${req.user._id}`);
    const blog = await Blog.findById(req.params.id).populate('createdBy') ;
    if(!blog) return res.status(404).send("not found") ; 
    console.log("the bl0g is :- ");
    
    console.log(blog);
    
    res.render('blog' , {
        user : req.user , 
        blog : blog ,
    })
})




export default router  ; 