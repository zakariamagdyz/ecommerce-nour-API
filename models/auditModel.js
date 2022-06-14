const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  action: { type: String, required: [true, "Audit must have a name"] },
  data: Object,
  status: Number,
  error: String,
  auditBy: String,
  auditOn: Date.now,
});

module.exports = mongoose.model("Audit", auditSchema);
