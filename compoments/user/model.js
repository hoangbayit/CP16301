const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: { type: ObjectId },
    username: { type: String, requiredPaths: true },
    password: { type: String, requiredPaths: true }
});

module.exports = mongoose.model('user', userSchema);