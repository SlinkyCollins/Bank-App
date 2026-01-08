const mongoose = require("mongoose");

userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String},
  accountNumber: { type: String, unique: true }, // Auto-generated 10-digit number
  balance: { type: Number },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: { type: Date, default: Date.now },
  role: { type: String, enum: ['admin', 'user'], default: 'user', required: true }, // Automatically assigned as 'user'
});

// Pre-save hook to generate accountNumber if not present
userSchema.pre('save', function(next) {
    if (this.role === 'user') {
        if (!this.accountNumber) {
            this.accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString(); // 10-digit random number
        }
        if (this.balance === undefined) {
            this.balance = 0; // Set default balance for users only
        }
    }
    next();
});

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;