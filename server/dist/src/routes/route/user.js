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
const token_1 = require("../../middleware/token");
const Service = require("../../service");
exports.default = (router) => __awaiter(this, void 0, void 0, function* () {
    // 注册
    const { reg, login, userInfo } = Service;
    router.post('/reg', Service.reg)
        .get('/userInfo', token_1.default, Service.userInfo);
});
//# sourceMappingURL=user.js.map