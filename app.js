const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
const crypto = require('crypto');
const axios = require('axios');
var Request = require("request");
// const _ = router();

router.get('/hello', (ctx) => {
  ctx.body = "router";
})

router.get('/wechat', (ctx) => {
  console.log('ctx', ctx.query);

  const q = ctx.query;
  const checkSignature = (q) => {
    var signature = q.signature;
    console.log('signature', signature);
    
    var echostr = q.echostr;
    var token = 'kiltoken';
    var timestamp = q.timestamp;
    var nonce = q.nonce;

    var array = new Array(token, timestamp, nonce);
    array.sort();
    var str = array.toString().replace(/,/g, "");
    var sha1Code = crypto.createHash("sha1");
    // var sha1Code = sha1(str);
    console.log('sha1Code', sha1Code);
    
    var code = sha1Code.update(str, 'utf-8').digest("hex");

    console.log('code', code, signature);
    
    if (code == signature) {
        return echostr;
    }
    return 'error';
  }


  ctx.body = checkSignature(q);
})

router.get('/access', (ctx)=> {
  // axios.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxb8d2f8c5e52e13ce&secret=233ad21a68a1b4757c694bec6f4a568b').then(res => {
  //   console.log('res', res);
  // })
  console.log('access');
  
  Request(
    {
      url:
        "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxb8d2f8c5e52e13ce&secret=233ad21a68a1b4757c694bec6f4a568b",
      method: "GET",
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
      }
    }
  );
})

app.use(router.routes());

// response
// app.use(ctx => {
//   ctx.body = 'Hello Koa';
// });

app.listen(3000);