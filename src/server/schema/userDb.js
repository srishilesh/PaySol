const mongoose = require('mongoose');

const user = mongoose.Schema({
    senderId: String,
    sender: String,
    publickey: String,
    password: String,
    conversations: [String],
})

module.exports = mongoose.model('userContents', user);