const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    //need message schema here
    sender:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type:String,
        trim:true
    },
    chat:{
        type:Schema.Types.ObjectId,
        ref:'Chat'
    }
},
    {
        timestamps:true
    }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

