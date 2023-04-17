
const asyncHandler=require('express-async-handler');
const Auctions=require('../model/auctionModel')
const User=require('../model/userModel');
//@desc Get Auctions
//@route GET /api/auctions
//@access Private

// const getAuctions=asyncHandler( async (req, res)=>{
//     const auctions=await Auctions.find({ user: req.user.id });
//     res.status(200).json(auctions);
//     if(!auctions){
//         res.status(200).json({user: req.user.id })
//     }
// })

const getAuctions = asyncHandler(async (req, res) => {
    const auctions = await Auctions.find({user: req.user.id})
  
    res.status(200).json(auctions)
  })

//   const getAuctionsForGuide = asyncHandler(async (req, res) => {
//     console.log("GETAUCTIONS FOR GUIDE CALLED");
//     // const role = "guide";
//     const auctions = await Auctions.find();
  
//     res.status(200).json(auctions)
//   })


const getAuctionsForGuide = async (req, res) => {
    const auctions = await Auctions.find();
    res.json(auctions);
  };
  


//@desc Get Auctions
//@route GET /api/auctions/:id
//@access Private
const getAuctionById=asyncHandler( async (req, res)=>{
    const auction=await Auctions.findById(req.params.id);
    res.status(200).json(auction);
});

//@desc Set Auction
//@route POST /api/Auction
//@access Private
const setAuction=asyncHandler( async (req, res)=>{
    if(!req.body){
        res.status(400)
        throw new Error('Please add ID');
    }
    const auction=await Auctions.create({
        auctionTourName: req.body.tourName,
        auctionTourId: req.body.tourId,
        auctionLanguage: req.body.language,
        auctionDate: req.body.date,
        auctionEndDate: req.body.endDate,
        auctionCity: req.body.city,
        auctionDesiredPrice: req.body.desiredPrice,
        auctionBids: req.body.auctionBids,
        auctionIsOpen: req.body.isOpen,
       
        auctionWonBy:req.body.wonBy,
        user: req.user.id,
        
        
    })

    res.status(200).json(auction);

});

//@desc Update Auction
//@route PUT /api/auctions/:id
//@access Public
const updateAuction=asyncHandler( async (req, res)=>{
    
 
     const auction=await Auctions.findById(req.params.id);
     if(auction){
        
         const updatedAuction=await Auctions.findByIdAndUpdate(req.params.id, req.body, {
             new: true,
         });
     
         res.status(200).json(updatedAuction)
     }else{
         if(!auction){
             res.status(400)
             throw new Error('Auction NOT FOUND');
         }
     }
 
 })


 //@desc Delete Auction
//@route DELETE /api/Dashboard/Auctions/:id/
//@access Private
const deleteAuction= asyncHandler(async (req, res)=>{
  

    const auction=await Auctions.findById(req.params.id);
    if(auction){
        await Auctions.findByIdAndRemove(req.params.id);
        res.status(200).json({id: req.params.id})
    }else if(!auction){
        res.status(400)
            throw new Error('Auction NOT FOUND');
    }
   
})


module.exports={getAuctions, getAuctionById, setAuction, deleteAuction, updateAuction, getAuctionsForGuide }