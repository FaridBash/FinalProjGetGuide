const express=require('express');
const router=express.Router();

const {getChats, getChatById, setChat, updateChat,}=require('../controllers/chatController');


router.route('/').get( getChats).post( setChat);
router.route('/chat/:chatRoomName').get(getChatById)
router.route('/chat/update/:id').put(updateChat);


module.exports=router;