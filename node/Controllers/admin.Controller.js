const userModel = require("../Models/user.model");
const transactionModel = require("../Models/transaction.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionModel.find().populate('userId', 'firstName lastName accountNumber');
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions", error: error.message });
  }
};

module.exports = { getAllUsers, getAllTransactions };