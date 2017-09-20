import { Server } from 'net';
import * as Irouter from 'koa-router';
import * as Service from '../service';
const router = new Irouter()

export const Router = (app: any) => {

  // 注册
  const { reg } = Service
  router.get('/api/reg', (ctx, next) => {ctx.body = { test: 233 }});
  // router.post('/api/reg', (ctx, next) => {ctx.body = { test: 666 }});
  router.post('/api/reg', Service.reg);
  router.all('/*',  async (ctx, next) => {
    ctx.body = '404'
  })

 app.use(router.routes())

}

export default Router