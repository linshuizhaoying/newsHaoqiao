"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Cors = require("koa-cors");
const Logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
// https 操作
const https = require("https");
const fs = require("fs");
const routes_1 = require("./routes");
const config_1 = require("./config");
const spiderMan_1 = require("./service/spider/spiderMan");
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
console.log('server start 666:');
console.log('服务正在监听端口:' + port);
app.listen(port, () => {
    console.log(('  App is running at http://localhost:%d in %s mode'), port, process.env.NODE_ENV);
    spiderMan_1.spiderInitial();
    console.log('  Press CTRL-C to stop\n');
});
// 开启https
const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/news.haoqiao.me/privkey.key'),
    cert: fs.readFileSync('/etc/letsencrypt/live/news.haoqiao.me/fullchain.pem')
};
try {
    const httpsServer = https.createServer(options, app.callback());
    httpsServer
        .listen(config_1.config.app.httpsPort, function (err) {
        if (!!err) {
            console.error('HTTPS server FAIL: ', err, (err && err.stack));
        }
        else {
            console.log(('  App is running at http://localhost:%d in %s mode'), config_1.config.app.httpsPort, process.env.NODE_ENV);
        }
    });
}
catch (ex) {
    console.error('Failed to start HTTPS server\n', ex, (ex && ex.stack));
}
//# sourceMappingURL=app.js.map