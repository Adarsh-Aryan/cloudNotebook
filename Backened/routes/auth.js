const express = require('express')
const bcrypt = require('bcryptjs');
require('dotenv').config()
const { body, validationResult } = require('express-validator');
const User = require('../models/Users')
const fetchUserData =require('../models/fetchUserData')
const jwt = require('jsonwebtoken')


const router = express.Router();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

router.post('/createUser',              // No Login Required
    body('username', "Enter a valid Emial Id").isEmail(),
    // password must be at least 5 chars long
    body('password', "Password must be atleast 5 Characters").isLength({ min: 5 }), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { username, password } = req.body
            const user = await User.findOne({ username: username })
            if (!user) {
                var saltRounds = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, saltRounds);
                const newUser= await User.create({
                    username:username,
                    password:hash
                })

                const data={
                    user:{
                        id:newUser._id
                    }
                }

                const token = jwt.sign(data,JWT_SECRET_KEY)

                res.json({success:true,token})

            }
            else {
                res.json({success:false,msg:"Username Already Exists ! Try a different Username"})
            }
        } catch (error) {
            res.status(500).send("Internal Server Error!")
        }




    })

router.post("/login",               // No Login Required
    body('username', "Enter a valid Emial Id").isEmail(),
    // password must be at least 5 chars long
    body('password', "Password must be atleast 5 Characters").isLength({ min: 5 }), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { username, password } = req.body
            const user = await User.findOne({ username: username })

            if (user) {
                const data = {
                    user:{
                        id:user._id
                    }
                }

                if (bcrypt.compareSync(password, user.password)) {
                    
                    const token = jwt.sign(data, JWT_SECRET_KEY)

                    res.json({success:true,token})
                }
                else {
                    res.json({success:false,msg:"Please enter the correct User Crendials"})
                }

            }
            else {
                res.json({success:false,msg:"Please enter the correct User Crendials"})
            }
        } catch (error) {
            res.status(500).send("Internal Server Error!")
        }

    })

    router.post('/getUser',fetchUserData,async (req,res)=>{ //  Login Required
        try {
            const user = await User.findOne({_id:req.user.id}).select("-password")
            if(user){
                res.json(user)
            }
            else{
                res.send(500).send("Internal Server Error")
            }
        } catch (error) {
            res.send(500).send("Internal Server Error")
        }
    })

module.exports = router

                
                
                
                