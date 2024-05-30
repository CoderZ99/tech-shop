const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    role: { type: String },
    phone: { type: String },
    status: { type: String }
})

// Define index
userSchema.index({ username: 1 }, { unique: true });

// Create and export model from schema
module.exports = mongoose.model('User', userSchema)