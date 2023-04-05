const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model')
const Message = require('./message.model')

const Conversation = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: User
    },
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: Message
        }
    ],
})

module.exports = mongoose.model('Conversation', Conversation);