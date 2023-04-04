const express=require('express');
const router=express.Router();

const {getTours,setTour, getTourById, updateTour, deleteTour}=require('../controllers/toursController')

router.route('/').get(getTours).post(setTour);
router.route('/:id').delete(deleteTour).put(updateTour).get(getTourById);


module.exports=router;