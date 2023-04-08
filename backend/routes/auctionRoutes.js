const express=require('express');
const auctionsRouter=express.Router();

const {getAuctions, getAuctionById, setAuction, deleteAuction}=require('../controllers/auctionController')

auctionsRouter.route('/Dashboard/Auctions').get(getAuctions).post(setAuction);
auctionsRouter.route('/Dashboard/Auctions/:id').delete(deleteAuction).get(getAuctionById);


module.exports=auctionsRouter;