
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
    res.json({message: "LoginUSer"})
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
            token: generateToken(user._id)
        })
    }
    res.json({message:'login User'});
})


const getUser= asyncHandler(async (req, res)=>{
    res.json({message: "RegisterUSer"})
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