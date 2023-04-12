
const jwt=require('jsonwebtoken');
const asyncHandler=require('express-async-handler');
const User=require('../model/userModel');



const registerUser= asyncHandler (async (req, res)=>{
    const {name, email, role, auctions, languages}=req.body;
    if(!name || !email || !role){
        throw new Error('Fields missing!');
    }

    //check if user exists
    const userExists=await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error("user already exists")
    }

    const user=await User.create({
        name,
        email,
        role,
        auctions,
        languages,
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            auctions: user.auctions,
            languages: user.languages,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('invalid user data');
    }

    
})

//post
const loginUser= asyncHandler(async (req, res)=>{
   
    const {email}=req.body
    const user=await User.findOne({email})
    if(user){
        res.json({
            _id:user.id,
            name:user.name,
            email: user.email,
            role:user.role,
            auctions:user.auctions,
            languages: user.languages,
            token: generateToken(user.id)
        })
        // res.json(user);
    }
})


const getUser= asyncHandler(async (req, res)=>{
   const {_id, name, email}=await User.findById(req.user.id)

   res.status(200).json({
    id: _id,
    name,
    email,
   })
})


const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    } )
}


module.exports={
    registerUser,
    loginUser,
    getUser,
}