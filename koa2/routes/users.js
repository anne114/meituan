const router = require('koa-router')()
const User = require('../dbs/models/user');

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/add',async function(ctx){
  const user = new User({
    name:'anne',
    age:22
  });
  try {
    await user.save();
  } catch (error) {
  }
  ctx.session.count++;
  ctx.body = 'this is a users/add response'
})
module.exports = router
