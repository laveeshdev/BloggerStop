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

router.get("/:id" , async (req , res) =>{
    const blog = await Blog.findById(req.params.id) ; 
    res.render('blog' , {
        user : req.user , 
        blog : blog ,
    })
})

router.get('/add-new' , (req,res)=>{
    return res.render('addBlog' , {
        user : req.user ,

    })

}).post('/add-new' ,upload.single('coverImage') ,  async (req , res)=> {
    console.log(req.body) ; 
    console.log(req.file) ; 
    const { title , body} = req.body ; 

    const blog = await Blog.create({
        body , 
        title , 
        createdBy : req._id , 
        coverImageURL : `/uploads/${req.file.filename}` ,
    }) ; 
    return res.redirect(`/blog/${blog._id}`) ;

})




export default router  ; 