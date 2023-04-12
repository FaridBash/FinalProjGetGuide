const express=require('express');
const router=express.Router();
const {getAuctions, getAuctionById, setAuction, deleteAuction}=require('../controllers/auctionController')


const {getTours,setTour, getTourById, updateTour, deleteTour}=require('../controllers/toursController')
const { protect } = require('../middleware/authMiddleware');
router.route('/').get(getTours).post(setTour);
router.route('/').post(setTour)
router.route('/:id').delete(deleteTour).put(updateTour).get(getTourById);

// router.route('/Dashboard/Auctions').get( protect, getAuctions).post(protect, setAuction);
// router.route('/Dashboard/Auctions/:id').delete(protect, deleteAuction).get(protect, getAuctionById);

module.exports=router;