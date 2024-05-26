const mongoose=require('mongoose')

const commentSchema=new mongoose.Schema({
    commentedBy:{type:mongoose.Schema.Types.ObjectId, ref: 'User',},
    comment:{
        type:String,
        required:true
    },
    commentedOn:{type:mongoose.Schema.Types.ObjectId, ref: 'Article'}
})

const Comment=new mongoose.model("Comment",commentSchema)

module.exports=Comment

