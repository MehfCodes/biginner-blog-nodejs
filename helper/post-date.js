const moment=require('moment')
module.exports={
    postDate(date,format){
        return moment(date).format(format)
    }
}