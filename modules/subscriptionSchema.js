const mongoose=require('mongoose')

const subscriptionSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref: 'User',},
    subscriptionPlan:{
        type:String,
        default:false
    }
})

const Subscription=new mongoose.model("Subscription",subscriptionSchema)

module.exports=Subscription

