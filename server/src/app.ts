import * as Koa from 'koa';
import * as Cors from 'koa-cors'
import * as Logger from 'koa-logger'
import * as bodyParser from 'koa-bodyparser'

import Route from './routes'

import { config } from './config'
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
mongoose.connect(config.mongo.url, { useMongoClient: true })

app.use(bodyParser())

Route(app)

const port = config.app.port
console.log('服务正在监听端口:' + port)
app.listen(port, () => {
  console.log(('  App is running at http://localhost:%d in %s mode'), port, process.env.NODE_ENV);
  console.log('  Press CTRL-C to stop\n');
});