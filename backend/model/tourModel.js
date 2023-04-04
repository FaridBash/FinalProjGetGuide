const mongoose=require('mongoose');
const { boolean } = require('yargs');

const tourSchema=mongoose.Schema({
    tourName: {
        type: String,
        required:[true, 'Please Enter Tour Name']
    },
    tourDescription: {
        type: String,
        required:[true, 'Please Enter Description']
    },
    tourPrice: {
        type: Number,
        required:[true, 'Please enter price']
    },
    
},
 {
    timestamps: true,
});

module.exports=mongoose.model('Tour', tourSchema);