const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    role: { type: String, enum: ['superadmin', 'admin'], default: 'admin' },
});

const adminModel = mongoose.model('adminModel', adminSchema);

module.exports = adminModel;