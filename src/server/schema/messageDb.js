const mongoose = require('mongoose');

const message = mongoose.Schema({
    content: String,
    sender: String,
    timestamp: String,
    conversationId: String,
});

module.exports = mongoose.model('messageContents', message);