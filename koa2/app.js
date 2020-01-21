const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// 使用自定义的中间件
const mwLearn = require('./middleware/learn');
const m2 = require('./middleware/m2')
// 路由
const index = require('./routes/index')
const users = require('./routes/users')
// mongoose
const mongoose = require('mongoose');
const dbConfig = require('./dbs/config');

// session
const session = require('koa-generic-session');
const Redis = require('koa-redis');

// error handler
onerror(app)

// session/redis
// 连接redis，redis连接不需要配置地址等其他项
app.keys = ['ddd']
app.use(session({
  store:new Redis()
}))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
// 使用自定义的中间件
// 中间件是洋葱模型，请求和返回都会执行一次，请求执行中间件里await next()之前的代码，返回执行await next()之后的代码
// 所以最后的输出顺序是：m1 start → m2 end → m2 end → m1 end
app.use(mwLearn())
app.use(m2())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// mongoose
mongoose.connect(dbConfig.dbs,{useNewUrlParser:true})


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
