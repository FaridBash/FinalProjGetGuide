const express=require('express');
const router=express.Router();

const {getAuctions, getAuctionById, setAuction, deleteAuction, updateAuction}=require('../controllers/auctionController')
const {protect} = require('../middleware/authMiddleware');


router.route('/').get(protect, getAuctions).post(protect, setAuction);
router.route('/:id').delete(protect, deleteAuction).get( getAuctionById).put(updateAuction);


module.exports=router;