const mongoose = require("mongoose");
const { boolean } = require("yargs");

const auctionSchema = mongoose.Schema(
  {
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

    auctionCity:{
        type: String,
        required: true,
    },
    auctionDesiredPrice: {
      type: Number,
      required: true,
    },
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("auction", auctionSchema);
