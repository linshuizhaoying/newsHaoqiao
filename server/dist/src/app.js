"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Cors = require("koa-cors");
const Logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const routes_1 = require("./routes");
const config_1 = require("./config");
const app = new Koa();
// 如果是开发者模式
if (process.env.NODE_ENV === 'production') {
    // CORS for dev 开启跨域
    console.log('cors');
    app.use(Cors());
    // logger for dev 日志记录
    console.log('logger');
    app.use(Logger());
}
console.log('start');
// sessions
// mongodb
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config_1.config.mongo.url, { useMongoClient: true }).catch((err) => {
    console.error('App starting error:', err.stack);
    process.exit(1);
});
app.use(bodyParser());
routes_1.Router(app);
const port = config_1.config.app.port;
console.log('服务正在监听端口:' + port);
app.listen(port, () => {
    console.log(('  App is running at http://localhost:%d in %s mode'), port, process.env.NODE_ENV);
    // spiderInitial()
    console.log('  Press CTRL-C to stop\n');
});
//# sourceMappingURL=app.js.map