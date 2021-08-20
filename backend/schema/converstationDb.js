const mongoose = require('mongoose');

const conversation = mongoose.Schema({
    participants: [String]
})

module.exports = mongoose.model('conversationContents', conversation);