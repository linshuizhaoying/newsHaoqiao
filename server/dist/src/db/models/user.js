const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    type: { type: String, require: true },
    email: { type: String, default: '' },
    RegDate: { type: Date, default: Date.now() }
});
module.exports = mongoose.model('User', UserSchema);
//# sourceMappingURL=user.js.map