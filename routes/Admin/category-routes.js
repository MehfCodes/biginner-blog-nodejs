const express= require('express')
const router = express.Router()
const category= require('../../models/category')
router.get('/',(req,res)=>{
    category.find({}).then(found=>{
        res.render('Admin/create-category',{found})
    })
})

router.post('/',(req,res)=>{
    const newcatgerory=new category({
        name:req.body.name
    })
    newcatgerory.save().then(saved=>{
        res.redirect('/admin/create-category')
    })
})

router.get('/edit/:id',(req,res)=>{
    
    category.findOne({_id:req.params.id}).then(found=>{
        
          res.render('Admin/edit-category',{found})
         })
        
       
   
})

router.put('/edit/:id',(req,res)=>{
    
    category.findOne({_id:req.params.id}).then(found=>{
        found.name=req.body.name
    
        found.save().then(saved=>{
          res.redirect('/admin/create-category')
         })
        
       
    })
})

router.delete('/delete/:id',(req,res)=>{
    category.findByIdAndRemove({_id:req.params.id}).then(()=>{
        res.redirect('/admin/create-category')
    })
})

module.exports=router