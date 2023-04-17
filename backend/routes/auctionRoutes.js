const express=require('express');
const router=express.Router();

const {getAuctions, getAuctionById, setAuction, deleteAuction, updateAuction, getAuctionsForGuide}=require('../controllers/auctionController')
const {protect} = require('../middleware/authMiddleware');


router.route('/auction').get(protect, getAuctions).post(protect, setAuction);
router.route('/auction/:id').delete(protect, deleteAuction).get( getAuctionById).put(updateAuction);

router.route('/guide').get(getAuctionsForGuide);

module.exports=router;