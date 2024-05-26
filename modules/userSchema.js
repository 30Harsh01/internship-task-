const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true                    //Role can be junrlist or common user 
    },
    subscriptionstatus:{
        type:Boolean,
        required:true,
        default:false
    },
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true}
})

const User=new mongoose.model('User',userSchema)

module.exports=User