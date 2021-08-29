const mongoose = require('mongoose');

const message = mongoose.Schema({
    message: String,
    sender_id: String,
    timestamp: String,
    amount: String,
    conversationId: String,
});

module.exports = mongoose.model('messageContents', message);