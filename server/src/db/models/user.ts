const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // md5加密
  type: {type: String, default: 1}, // 0 是管理员 1 是普通用户
  email: { type: String, default: '' },
  RegDate: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('User', UserSchema);
