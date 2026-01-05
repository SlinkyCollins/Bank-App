const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
    name: { type: String, required: true },
    accountNumber: { type: String, required: true },
    bankName: { type: String, required: true },
    addedAt: { type: Date, default: Date.now },
});

const beneficiaryModel = mongoose.model('beneficiaryModel', beneficiarySchema);

module.exports = beneficiaryModel;