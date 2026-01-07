const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
    type: { type: String, enum: ['deposit', 'withdraw', 'transfer'], required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    recipientAccount: { type: String, required: function() { return this.type === 'transfer' && !this.senderAccount; } }, // Required only for outgoing
    senderAccount: { type: String }, // For incoming transfers
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    date: { type: Date, default: Date.now },
});

const transactionModel = mongoose.model('transactionModel', transactionSchema);

module.exports = transactionModel;