const mongoose = require("mongoose");
const { boolean } = require("yargs");

const tourSchema = mongoose.Schema(
  {
    tourName: {
      type: String,
      required: [true, "Please Enter Tour Name"],
    },
    tourDescription: {
      type: String,
      required: [true, "Please Enter Description"],
    },
    sitesDuringtheTour: {
      type: Array,
      required: [true, "Please Enter sites"],
    },

    highlights: {
      type: Array,
    },

    images:{
        type: String,
        // required: [true, "Please enter price"],
    },

    city:{
        type: String,
        // required: [true, "Please enter city"],
    },
    tourPrice: {
      type: Number,
    //   required: [true, "Please enter price"],
    },
    data: {
      type:Buffer,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tour", tourSchema);
