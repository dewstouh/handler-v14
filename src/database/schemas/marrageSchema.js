const { model, Schema } = require('mongoose')

let marriageSchema = new Schema ({
    user1: { type: String, required: true },
    user2: { type: String, required: true },
    marriedAt: { type: Date, default: Date.now }
});

module.exports = model('marrage', marriageSchema)