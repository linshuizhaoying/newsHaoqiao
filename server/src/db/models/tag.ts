import mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  tagTitle: { type: String },
  status: { type: String }, // 活跃, 停用
});

module.exports = mongoose.model('Tag', TagSchema);
