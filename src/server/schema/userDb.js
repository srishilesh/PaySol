const mongoose = require('mongoose');

const user = mongoose.Schema({
    _id: String,
    username: String,
    password: String,
    conversations: [String],
})

module.exports = mongoose.model('userContents', user);