
const asyncHandler=require('express-async-handler');
const Tours=require('../model/tourModel')

//@desc Get Tours
//@route GET /api/tours
//@access Private
const getTours=asyncHandler( async (req, res)=>{
    const tours=await Tours.find();
    res.status(200).json(tours);
})

const getTourById=asyncHandler( async (req, res)=>{
    const tour=await Tours.findById(req.params.id);
    res.status(200).json(tour);
})

//@desc Set Tour
//@route POST /api/Tour
//@access Private
const setTour=asyncHandler( async (req, res)=>{
    if(!req.body){
        res.status(400)
        throw new Error('Please add ID');
    }
    const tour=await Tours.create({
        tourName: req.body.tourName,
        tourDescription: req.body.tourDescription,
        sitesDuringtheTour: req.body.sitesDuringtheTour,
        highlights: req.body.highlights,
        city: req.body.city,
        tourPrice: req.body.tourPrice,
        // images: req.files.map(file => file.filename),
    })

    res.status(200).json(tour);

})

//@desc Update Tour
//@route PUT /api/tours/:id
//@access Private
const updateTour=asyncHandler( async (req, res)=>{
    console.log(req.body);
 
     const tour=await Tours.findById(req.params.id);
     if(tour){
         const updatedTour=await Tours.findByIdAndUpdate(req.params.id, req.body, {
             new: true,
         });
     
         res.status(200).json(updatedTour)
     }else{
         if(!tour){
             res.status(400)
             throw new Error('Tour NOT FOUND');
         }
     }
 
 })

 //@desc Delete Tour
//@route DELETE /api/Tours/:id/
//@access Private
const deleteTour= asyncHandler(async (req, res)=>{
  

    const tour=await Tours.findById(req.params.id);
    if(tour){
        await Tours.findByIdAndRemove(req.params.id);
        res.status(200).json({id: req.params.id})
    }else if(!tour){
        res.status(400)
            throw new Error('Tour NOT FOUND');
    }
   
})

module.exports={getTours, getTourById, setTour, updateTour, deleteTour }