const mongoose = require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    role:{
        type: String,
        required: true,
    },
    auctions:{
        type: Array,
        required: true,
    },
    languages:{
        type:Array,
        required: false,
    }

},
{
    timestamp:true
})


module.exports = mongoose.model('User', userSchema)