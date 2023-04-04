const express=require('express');
const router=express.Router();

const {getTours}=require('../controllers/toursController')

router.route('/').get(getTours);


module.exports=router;