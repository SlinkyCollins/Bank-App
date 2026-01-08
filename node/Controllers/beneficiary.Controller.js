const beneficiaryModel = require("../Models/beneficiary.model");

const addBeneficiary = async (req, res) => {
  const { name, accountNumber, bankName } = req.body;
  const userId = req.user.id;

  if (!name || !accountNumber || !bankName) {
    return res.status(400).json({ message: "Name, account number, and bank name are required." });
  }

  try {
    // Check if beneficiary already exists for this user
    const existing = await beneficiaryModel.findOne({ userId, accountNumber });
    if (existing) {
      return res.status(400).json({ message: "Beneficiary already exists." });
    }

    const beneficiary = new beneficiaryModel({
      userId,
      name,
      accountNumber,
      bankName,
    });
    await beneficiary.save();

    res.status(201).json({ message: "Beneficiary added successfully.", beneficiary });
  } catch (error) {
    res.status(500).json({ message: "Failed to add beneficiary.", error: error.message });
  }
};

const removeBeneficiary = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const beneficiary = await beneficiaryModel.findOneAndDelete({ _id: id, userId });
    if (!beneficiary) {
      return res.status(404).json({ message: "Beneficiary not found." });
    }

    res.status(200).json({ message: "Beneficiary removed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove beneficiary.", error: error.message });
  }
};

const getBeneficiaries = async (req, res) => {
  const userId = req.user.id;

  try {
    const beneficiaries = await beneficiaryModel.find({ userId }).sort({ addedAt: -1 });
    res.status(200).json({ beneficiaries });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch beneficiaries.", error: error.message });
  }
};

module.exports = { addBeneficiary, removeBeneficiary, getBeneficiaries };