const express = require('express')
const router=express.Router()
const post=require('./../../models/post')
const category=require('./../../models/category')
router.all('/*',(req,res,next)=>{
    req.app.locals.layout='clientTemplate'
    next()
})


router.get('/',(req,res)=>{
    post.find({}).then(posts=>{
        category.find({}).then(cg=>{
            res.render('client/home',{posts,cg})
        })
        
    })
})


router.get('/about',(req,res)=>{
    res.render('client/about')
})

router.get('/login',(req,res)=>{
    res.render('client/login')
})

router.get('/home/post/:id',(req,res)=>{
    post.findById({_id:req.params.id}).then(found=>{
        res.render('client/read-more',{found})
    })
})
router.get('/home/category/:name',(req,res)=>{
   category.findOne({name:req.params.name}).then(cg=>{
       post.find({category:cg.id}).then(found=>{
        res.render('client/categories',{found})
       })
   })
})
module.exports=router