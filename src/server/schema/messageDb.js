const mongoose = require('mongoose');

const message = mongoose.Schema({
    content: String,
    sender_id: String,
    timestamp: String,
    conversationId: String,
});

module.exports = mongoose.model('messageContents', message);