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
const News = require('../models/news');
exports.saveToNews = (item) => __awaiter(this, void 0, void 0, function* () {
    const { title, enTitle, url, sourceTitle, sourceLink, type, tagList, read, score } = item;
    const duplicate = { 'title': title };
    News.findOneAndUpdate(duplicate, Object.assign({}, item), { upsert: true }, (err, doc) => {
        // console.log('无重复插入成功!')
    });
});
exports.AllNews = () => __awaiter(this, void 0, void 0, function* () {
    return yield News.find({});
});
//# sourceMappingURL=news.js.map