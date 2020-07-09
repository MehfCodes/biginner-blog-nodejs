const mongoose = require('mongoose')
const schema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    }
})
module.exports=mongoose.model('category',schema)