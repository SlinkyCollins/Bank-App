const mongoose = require('mongoose');

userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    password: {type: String, required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
})

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;