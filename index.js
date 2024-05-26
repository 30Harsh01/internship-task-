const express=require('express')
const conn=require('./database/conn.js')
const app=express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hey')
})



app.use('/api/auth',require('./routes/userauth.js'))
app.use('/api/article',require('./routes/articledetails.js'))
app.use('/api/category',require('./routes/categoryRoutes.js'))
app.use('/api/comments',require('./routes/commetsRoutes.js'))
app.use('/api/notification',require('./routes/notificationRoutes.js'))


const port=3000;
app.listen(port,()=>{
    conn()
    console.log(`Listening to ${port}`)
})