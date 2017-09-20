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
const Irouter = require("koa-router");
const Service = require("../service");
const router = new Irouter();
exports.Router = (app) => {
    // 注册
    const { reg } = Service;
    router.get('/api/reg', (ctx, next) => { ctx.body = { test: 233 }; });
    // router.post('/api/reg', (ctx, next) => {ctx.body = { test: 666 }});
    router.post('/api/reg', Service.reg);
    router.all('/*', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        ctx.body = '404';
    }));
    app.use(router.routes());
};
exports.default = exports.Router;
//# sourceMappingURL=index.js.map