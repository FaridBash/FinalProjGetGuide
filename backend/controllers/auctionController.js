
const asyncHandler=require('express-async-handler');
const Auctions=require('../model/auctionModel')

//@desc Get Auctions
//@route GET /api/auctions
//@access Private
const getAuctions=asyncHandler( async (req, res)=>{
    const auctions=await Auctions.find();
    res.status(200).json(auctions);
})

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
        auctionCity: req.body.city,
        auctionDesiredPrice: req.body.desiredPrice,
        
    })

    res.status(200).json(auction);

});


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


module.exports={getAuctions, getAuctionById, setAuction, deleteAuction }