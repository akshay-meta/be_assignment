const mongoose = require("mongoose");
const shortId = require("shortid");

const shortUrlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    unique: true,
    default: shortId.generate,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

shortUrlSchema.index({createdAt: -1}, {expireAfterSeconds: process.env.EXPIRY_AFTER_HOURS * 3600 || 86400})

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
