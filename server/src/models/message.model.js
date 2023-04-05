const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model')

const Message = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: User
    },
    content: {
        type: String,
        minLength: [1, "Message must have content"],
        maxLength: 255,
    },
    createAt:{
        type: Date, 
        default: Date.now
    }
})

module.exports = mongoose.model('Message', Message);