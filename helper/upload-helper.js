module.exports={
    isEmpty(obj){
        for(let k in obj){
            if(obj.hasOwnProperty(k)) return false
        }
        return true
    }
}