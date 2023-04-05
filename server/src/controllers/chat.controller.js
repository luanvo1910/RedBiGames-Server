const { response } = require('express');
const Message = require('../models/message.model');
const User = require('../models/user.model');
const Conversation = require('../models/conversation.model')

class ChatController {
    async listConversationAdmin(req, res) {
        try {
            const conversations = await Conversation.find({}).populate('userId').populate('messages');
            res.json({ success: true, conversations: conversations })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async loadConversation(req, res) {
        const userId = req.userId;
        const conversation = await Conversation.findOne({userId: userId}).populate('userId').populate('messages');

        if (conversation) {
            return res.json({ success: true, message: 'Loaded your conversation', conversation: conversation })
        }

        try {
            const newConversation = new Conversation({
                userId
            })
            await newConversation.save()

            res.json({ success: true, message: 'Conversation created successfully', conversation: newConversation})
        } catch (error) {
            console.log(error)
		    res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async addMessage(req, res) {
        const userId = req.userId;
        const {conversationId, content} = req.body;
        const conversation = await Conversation.findOne({_id: conversationId}).populate('userId').populate('messages');

        const newMessage = new Message({
            userId,
            content
        })
        await newMessage.save()

        try {
            const messages = conversation.messages;
            messages.push(newMessage);
            let updatedConversation = await Conversation.findOneAndUpdate({_id: conversationId}, {messages: messages})
            res.json({ success: true, message: 'Message send successfully', conversation: conversation})
        } catch (error) {
            console.log(error)
		    res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
}
module.exports = new ChatController;