import { allTags } from '../service/tagApi';
import * as Irouter from 'koa-router';
import tokenPermission from '../middleware/token'
import * as Service from '../service';

import { config } from '../config'

// 前缀路由 /api
const router = new Irouter({prefix: config.app.baseApi})

export const Router = (app: any) => {
  const { reg,
          login,
          userInfo,
          requestFrame,
          onlineTest,
          addSource,
          allSources,
          removeSource,
          updateSource,
          addTag,
          allTags,
          updateTag
        } = Service

  router.post('/reg', Service.reg)
        .post('/login', Service.login)
        .get('/userInfo', tokenPermission, Service.userInfo)
        // 用于持久化登录,只要auth头有未过期的token验证就能证明用户的登录状态
        .get('/token', tokenPermission, Service.token)
        // 管理员操作
        .get('/requestFrame/:link', Service.requestFrame)
        .post('/onlineTest', Service.onlineTest)
        .post('/addSource', tokenPermission, addSource)
        .get('/allSources', tokenPermission, allSources)
        .post('/removeSource', tokenPermission, removeSource)
        .post('/updateSource', tokenPermission, updateSource)
        .get('/allTags', tokenPermission, allTags)
        .post('/updateTag', tokenPermission, updateTag)
        .post('/addTag', tokenPermission, addTag)

  router.all('/*',  async (ctx, next) => {
    ctx.body = '404'
  })

 app.use(router.routes())

}

export default Router