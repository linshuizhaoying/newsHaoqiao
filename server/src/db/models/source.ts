import mongoose = require('mongoose');
const SourceSchema = new mongoose.Schema({
  sourceTitle: { type: String },
  url: { type: String },
  type: { type: String }, // spider rss email
  code: { type: String },
  lang: { type: String },
  CreateDate: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Source', SourceSchema);
