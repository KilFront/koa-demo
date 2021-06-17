const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
// const _ = router();

router.get('/hello', (ctx) => {
  ctx.body = "router";
})

router.get('/wechat', (ctx) => {
  console.log('ctx', ctx.query);
  ctx.body = "wechat";
})

app.use(router.routes());

// response
// app.use(ctx => {
//   ctx.body = 'Hello Koa';
// });

app.listen(3000);