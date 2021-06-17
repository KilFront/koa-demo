const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
const crypto = require('crypto-js');
// const _ = router();

router.get('/hello', (ctx) => {
  ctx.body = "router";
})

router.get('/wechat', (ctx) => {
  console.log('ctx', ctx.query);

  const q = ctx.query;
  const checkSignature = (q) => {
    var signature = q.signature;
    var echostr = q.echostr;
    var token = 'shuaihua';
    var timestamp = q.timestamp;
    var nonce = q.nonce;

    var array = new Array(token, timestamp, nonce);
    array.sort();
    var str = array.toString().replace(/,/g, "");
    var sha1Code = crypto.createHash("sha1");
    var code = sha1Code.update(str, 'utf-8').digest("hex");

    if (code == signature) {
        return echostr;
    }
    return 'error';
  }


  ctx.body = checkSignature(q);
})

app.use(router.routes());

// response
// app.use(ctx => {
//   ctx.body = 'Hello Koa';
// });

app.listen(3000);