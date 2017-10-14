import mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  TagTitle: { type: String },
  status: { type: String },
});

module.exports = mongoose.model('Tag', TagSchema);
