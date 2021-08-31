const mongoose = require('mongoose');

const conversation = mongoose.Schema({
    participants: [Object]
})

module.exports = mongoose.model('conversationContents', conversation);