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
const validator_1 = require("../utils/validator");
const Msg = {
    0: '数据库出错!',
    2: '用户数据不正常',
    3: '用户名不能重复'
};
// 返回正常数据
const success = (data) => {
    return {
        'state': {
            'code': 1,
            'msg': '注册成功!'
        },
        'data': {
            data
        }
    };
};
// 返回错误提醒
const error = (data) => {
    return {
        'state': {
            'code': data.code,
            'msg': data.msg
        }
    };
};
exports.reg = (ctx) => __awaiter(this, void 0, void 0, function* () {
    console.log(ctx.request.body);
    const { username, password, email } = ctx.request.body;
    // 后端先做初步的数据校验和非法字符处理
    if (validator_1.default.userCheck(username) && validator_1.default.passCheck(password) && validator_1.default.emailCheck(email)) {
        // 提交数据符合规范，查询数据库验证
        console.log('用户提交数据正常');
        const temp = {
            userId: 'id123',
            userName: username
        };
        return ctx.body = success(temp);
    }
    else {
        // 用户提交数据异常
        return ctx.body = error({
            code: 2,
            msg: Msg[2]
        });
    }
});
//# sourceMappingURL=userApi.js.map