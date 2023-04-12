const mongoose = require("mongoose");
const { boolean } = require("yargs");

const auctionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    auctionTourName: {
      type: String,
      required: true,
    },
    auctionTourId: {
      type: String,
      required: true,
    },
    auctionLanguage: {
      type: String,
      required: true,
    },
    auctionDate: {
      type: Date,
      required: true,
    },
    auctionEndDate: {
      type: Date,
      required: true,
    },

    auctionCity:{
        type: String,
        required: true,
    },
    auctionDesiredPrice: {
      type: Number,
      required: true,
    },
    auctionBids:{
        type:Array,
        required: true
    },
    auctionIsOpen:{
        type:Boolean,
        required: true
    },
    auctionWonBy:{
        type:String,
        required: true
    },
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("auction", auctionSchema);
