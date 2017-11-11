import * as Koa from 'koa';
import * as Cors from 'koa-cors'
import * as Logger from 'koa-logger'
import * as bodyParser from 'koa-bodyparser'
// https 操作
import * as https from 'https';
import * as fs from 'fs';
import { Router } from './routes'

import { config } from './config'
import { spiderInitial } from './service/spider/spiderMan';
const app = new Koa()
// 如果是开发者模式
if (process.env.NODE_ENV === 'production') {
  // CORS for dev 开启跨域
  console.log('cors')
  app.use(Cors());
  // logger for dev 日志记录
  console.log('logger')
  app.use(Logger())
}
console.log('start')

// sessions

// mongodb

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.url, { useMongoClient: true }).catch((err: any) => { // if error we will be here
  console.error('App starting error:', err.stack);
  process.exit(1);
});

app.use(bodyParser())

Router(app)
const port = config.app.port
console.log('server start 666:')
console.log('服务正在监听端口:' + port)
app.listen(port, () => {
  console.log(('  App is running at http://localhost:%d in %s mode'), port, process.env.NODE_ENV);
  spiderInitial()

  console.log('  Press CTRL-C to stop\n');
});

// 开启https

const options: any = {
  key: fs.readFileSync('/etc/letsencrypt/live/news.haoqiao.me/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/news.haoqiao.me/fullchain.pem')
};
try {
  const httpsServer = https.createServer(options, app.callback());
  httpsServer
    .listen( config.app.httpsPort, function(err: any) {
      if (!!err) {
        console.error('HTTPS server FAIL: ', err, (err && err.stack));
      }
      else {
        console.log(('  App is running at https://localhost:%d in %s mode'), config.app.httpsPort, process.env.NODE_ENV);
      }
    });
}
catch (ex) {
  console.error('Failed to start HTTPS server\n', ex, (ex && ex.stack));
}