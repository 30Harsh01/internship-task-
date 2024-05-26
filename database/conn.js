const mongoose=require('mongoose')

const conn=()=>{
    mongoose.connect('mongodb://localhost:27017/internshiptask')
    .then(()=>{
        console.log("Conntected to database")
    }).catch(()=>{
        console.log("Unable to connect databasse")
    })
}
module.exports=conn