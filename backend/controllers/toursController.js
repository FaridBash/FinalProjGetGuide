
const asyncHandler=require('express-async-handler');
const Tours=require('../model/tourModel')


//@desc Get Tours
//@route GET /api/tours
//@access Private
const getTours=asyncHandler( async (req, res)=>{
    const tours=await Tours.find();
    res.status(200).json(tours);
})


module.exports={getTours}