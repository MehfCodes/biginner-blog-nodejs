module.exports={
    selected(selected,options){
        return options.fn(this)
        .replace(new RegExp('value=\"'+ selected +'\"'),'$&selected="selected"')
    }
}