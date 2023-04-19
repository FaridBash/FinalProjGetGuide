const mongoose = require("mongoose");
const { boolean } = require("yargs");

const chatSchema = mongoose.Schema(
  {
    
    chatRoomName: {
      type: String,
      required: true,
    },
    
    chatMessages:{
        type:Array,
        required: true
    },
    chatId:{
        type:String,
        required: true
    },
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chat", chatSchema);
