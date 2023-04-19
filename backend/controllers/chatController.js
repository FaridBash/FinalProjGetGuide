const asyncHandler=require('express-async-handler');
const Chats=require('../model/chatModel')

//@desc Get Chats
//@route GET /api/Chats
//@access Private
const getChats=asyncHandler( async (req, res)=>{
    const chats=await Chats.find();
    res.status(200).json(chats);
})

const getChatById=asyncHandler( async (req, res)=>{
    const chat = await Chats.findOne({ chatRoomName: req.params.chatRoomName });
    // const chat=await Chats.findById(req.params.chatRoomName);
    res.status(200).json(chat);
})

//@desc Set Chat
//@route POST /api/Chat
//@access Private
const setChat=asyncHandler( async (req, res)=>{
    if(!req.body){
        res.status(400)
        throw new Error('Please add ID');
    }
    const chat=await Chats.create({
        chatRoomName: req.body.chatRoomName,
        chatMessages: req.body.chatMessages,
        chatId: req.body.chatId,
    })

    res.status(200).json(chat);

})

//@desc Update Chat
//@route PUT /api/Chat/:id
//@access Private
const updateChat=asyncHandler( async (req, res)=>{
    console.log(req.body);
 
    const chat = await Chats.findById(req.params.id);
     if(chat){
         const updatedChat=await Chats.findByIdAndUpdate(req.params.id, req.body, {
             new: true,
         });
     
         res.status(200).json(updatedChat)
     }else{
         if(!chat){
             res.status(400)
             throw new Error('chat NOT FOUND');
         }
     }
 
 })


module.exports={getChats,
    getChatById,
    setChat,
    updateChat, }