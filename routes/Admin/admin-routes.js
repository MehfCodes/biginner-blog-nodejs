const express = require('express')
const router=express.Router()
const post=require('./../../models/post')
const category=require('./../../models/category')
const {isEmpty} = require("./../../helper/upload-helper")
const path=require('path')
const fs = require('fs')
router.all('/*',(req,res,next)=>{
    req.app.locals.layout='adminTemplate'
    next()
})

router.get('/',(req,res)=>{
    res.render('Admin/admin')
})

router.get('/posts',(req,res)=>{
    post.find({}).then(posts=>{
        res.render('Admin/posts',{posts})
    })
})

router.get('/create',(req,res)=>{
    category.find({}).then(found=>{
        res.render('Admin/create',{found})
    })
    
})


router.post('/create',(req,res)=>{
    let error=[]
    
    let name='new_york_city_aerial_view-wallpaper-1280x720.jpg'
    
    let file=null
    let dir=null
    if(!isEmpty(req.files))
    {
        
        file=req.files.file
         name=Date.now()+'-'+file.name
        dir='./public/Upload/'+name
       
        
    }
    else {
      error.push({msg:'please upload file'})
      
    }
    
    if(!req.body.title)  error.push({msg:'please enter title'})
    if(!req.body.status)  error.push({msg:'please selecte status'})
    if(!req.body.text)  error.push({msg:'please enter text'})
    if(error.length>0)
    {
        res.render('Admin/create',{error})
    }
    else{
       
        const newpost=new post({
            title:req.body.title,
            status:req.body.status,
            file:name,
            text:req.body.text,
            category:req.body.category
        })
        newpost.save().then(saved=>{
            file.mv(dir,err=>console.log(err))
            req.flash('seccess_msg',`post ${saved.title} created`)
            res.redirect('/admin/posts')
        }).catch(err=>console.log(err))
      
    }
   // console.log(req.files.file)
})

router.get('/posts/edit/:id',(req,res)=>{
    post.findById({_id:req.params.id}).then(post=>{
        category.find({}).then(cg=>{
            res.render('Admin/edit',{post,cg})
        })
        
    })
    
    
})
router.put('/posts/edit/:id',(req,res)=>{
    
    post.findOne({_id:req.params.id}).then(found=>{
        found.title=req.body.title
        found.status=req.body.status
        found.text=req.body.text
        if(!isEmpty(req.files))
    {
        let name='new_york_city_aerial_view-wallpaper-1280x720.jpg'
        let file=req.files.file
         name=Date.now()+'-'+file.name
        found.file=name
        let dir='./public/Upload/'+name
        file.mv(dir,err=>console.log(err))
    }
        found.save().then(saved=>{
            req.flash('edit_msg',`post ${saved.title} edited`)
          res.redirect('/admin/posts')
         })
        
       
    })
})

router.delete('/posts/delete/:id',(req,res)=>{
    post.findOne({_id:req.params.id}).then(dc=>{
        fs.unlink('./public/Upload/'+dc.file,err=>{
            if (err) throw err
            dc.remove()
            req.flash('delete_msg',`post ${dc.title} deleted`)
            res.redirect('/admin/posts')
        })
        
    }).catch(err=>console.log(err))
})
module.exports=router