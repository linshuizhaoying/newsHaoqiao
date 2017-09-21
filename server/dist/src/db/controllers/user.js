"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../models/user.js');
exports.AddRegUser = (user) => __awaiter(this, void 0, void 0, function* () {
    const { username, password, email } = user;
    const newUser = new User({ username, password, email });
    let hadUser = '';
    const result = {
        status: '',
        userId: '',
        userName: '',
        msg: ''
    };
    yield User.findOne({ 'username': username }, (err, data) => {
        hadUser = data;
    });
    // 先对用户名进行重复校验
    if (hadUser && hadUser.username === username) {
        result.msg = '用户名不能重复';
        result.status = 'error';
        return result;
    }
    else {
        console.log('添加用户');
        yield newUser.save().then((data) => {
            console.log('保存后的信息为:');
            console.log(data);
            result.msg = '用户添加成功!';
            result.status = 'success';
            result.userId = data._id;
            result.userName = data.username;
            console.log(result);
        });
        return result;
    }
});
//# sourceMappingURL=user.js.map