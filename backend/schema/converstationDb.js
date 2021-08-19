const mongoose = require('mongoose');

const conversation = mongoose.Schema({
    conversationId: String,
    participants: [String],
})

module.exports = mongoose.model('conversationContents', conversation);