const express = require('express')
const User = require('../modules/userSchema')
const router = express.Router();
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const fetchUser=require('../middleware/fetchuser')
const JWT_SCRET='internshiptask'    //this must be kept screat



router.post('/createuser',[
    body('name','message-Enter a valid name').isLength({min:5}),
    body('email').isEmail(),
    body('password').isLength({min:8})
], async (req, res) => {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        try{
            let user=await User.findOne({email:req.body.email})
            if(user){
                return res.status(400).json({"Error message":"The user already exist"})
            }
            let secPass=await bcrypt.hash(req.body.password,10)
            user =await User.create({
                name:req.body.name,
                role:req.body.role,
                subscriptionstatus:req.body.subscriptionstatus,
                email:req.body.email,
                password:secPass,
            })
            
            const data={
                user:{
                    id:user._id
                }
            }
            const authtoken=await jwt.sign(data,JWT_SCRET)
            res.json({authtoken})
        }catch(err){
            console.log(err)
            res.json({"err":err})

            res.status(500)
        }
})
//login
router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
  ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User doesn't exist" });
      }
  
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Incorrect password" });
      }
      const data = {
        user: {
          id: user._id
        }
      };
      const authtoken = jwt.sign(data, JWT_SCRET);
      res.json({ authtoken });
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
});

module.exports = router;