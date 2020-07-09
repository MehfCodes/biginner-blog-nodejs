const mongoose=require('mongoose')
const schema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    file:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    }
})

module.exports=mongoose.model('post',schema)