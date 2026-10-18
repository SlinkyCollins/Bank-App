const mongoose = require("mongoose");

const readiness = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1 || !mongoose.connection.db) {
      throw new Error("Mongoose is not connected");
    }

    await mongoose.connection.db.admin().ping();

    return res.status(200).json({
      status: "ready",
      database: "mongodb_connected",
    });
  } catch (error) {
    console.error("NairaNest database readiness check failed:", error.message);

    return res.status(503).json({
      status: "not_ready",
      error: "MongoDB unreachable",
    });
  }
};

module.exports = { readiness };
