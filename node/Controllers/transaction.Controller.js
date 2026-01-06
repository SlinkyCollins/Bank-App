const mongoose = require("mongoose");
const transactionModel = require("../Models/transaction.model");
const userModel = require("../Models/user.model");
const beneficiaryModel = require("../Models/beneficiary.model");

// Deposit money
const deposit = async (req, res) => {
  const { amount, description } = req.body;
  const userId = req.user.id;

  if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await userModel.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({ message: "User not found" });
    }

    user.balance += amount;
    await user.save({ session });

    const transaction = new transactionModel({
      userId,
      type: "deposit",
      amount,
      description: description || "Deposit",
      status: "pending", // Start as pending
    });
    await transaction.save({ session });

    // On success, update status
    transaction.status = "completed";
    await transaction.save({ session });

    await session.commitTransaction();
    res.status(200).json({
      message: "Deposit successful",
      balance: user.balance,
      transaction: {
        _id: transaction._id,
        userId,
        type: "deposit",
        amount,
        description: description || "Deposit",
        date: transaction.date,
        status: "completed",
      },
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: "Deposit failed", error: error.message });
  } finally {
    session.endSession();
  }
};

// Withdraw money
const withdraw = async (req, res) => {
  const { amount, description } = req.body;
  const userId = req.user.id;

  if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await userModel.findById(userId).session(session);
    if (user.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient funds" });
    }

    user.balance -= amount;
    await user.save({ session });

    const transaction = new transactionModel({
      userId,
      type: "withdraw",
      amount,
      description,
      status: "pending",
    });
    await transaction.save({ session });

    transaction.status = "completed";
    await transaction.save({ session });

    await session.commitTransaction();
    res.status(200).json({
      message: "Withdrawal successful",
      balance: user.balance,
      transaction: {
        _id: transaction._id,
        userId,
        type: "withdraw",
        amount,
        description,
        date: transaction.date,
        status: "completed",
      },
    });
  } catch (error) {
    await session.abortTransaction();
    res
      .status(500)
      .json({ message: "Withdrawal failed", error: error.message });
  } finally {
    session.endSession();
  }
};

// Transfer money
const transfer = async (req, res) => {
  const { accountNumber, beneficiaryId, amount, description } = req.body;
  const userId = req.user.id;

  if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });
  if (!accountNumber)
    return res
      .status(400)
      .json({ message: "Recipient account number required" });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await userModel.findById(userId).session(session);
    if (user.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient funds" });
    }

    if (beneficiaryId) {
      const beneficiary = await beneficiaryModel
        .findOne({ _id: beneficiaryId, userId })
        .session(session);
      if (!beneficiary || beneficiary.accountNumber !== accountNumber) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Invalid beneficiary" });
      }
    }

    const recipient = await userModel
      .findOne({ accountNumber })
      .session(session);
    if (!recipient) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Recipient account not found" });
    }
    if (recipient._id.toString() === userId) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Cannot transfer to yourself" });
    }

    user.balance -= amount;
    recipient.balance += amount;
    await user.save({ session });
    await recipient.save({ session });

    const senderTransaction = new transactionModel({
      userId,
      type: "transfer",
      amount,
      description,
      recipientAccount: accountNumber,
      status: "pending",
    });
    await senderTransaction.save({ session });

    const recipientTransaction = new transactionModel({
      userId: recipient._id,
      type: "transfer",
      amount,
      description: `${description} - Received from ${user.firstName} ${user.lastName}`,
      recipientAccount: user.accountNumber,
      status: "pending",
    });
    await recipientTransaction.save({ session });

    // On success, update statuses
    senderTransaction.status = "completed";
    recipientTransaction.status = "completed";
    await senderTransaction.save({ session });
    await recipientTransaction.save({ session });

    await session.commitTransaction();
    res.status(200).json({
      message: "Transfer successful",
      balance: user.balance,
      transaction: {
        _id: senderTransaction._id,
        userId,
        type: "transfer",
        amount,
        description,
        recipientAccount: accountNumber,
        date: senderTransaction.date,
        status: "completed",
      },
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: "Transfer failed", error: error.message });
  } finally {
    session.endSession();
  }
};

// Get transaction history
const getTransactions = async (req, res) => {
  const userId = req.user.id;

  try {
    const transactions = await transactionModel
      .find({ userId })
      .sort({ date: -1 }); // Keep sorting (newest first) for consistency

    res.status(200).json({ transactions });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch transactions", error: error.message });
  }
};

module.exports = { deposit, withdraw, transfer, getTransactions };
