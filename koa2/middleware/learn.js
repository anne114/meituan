// middleware-learn
/**
 * 中间件是一个返回异步函数的函数，异步函数有ctx和next参数
 */
/** 
 * ctx表示执行下文，包含request、response、url、header等字段
 * */
/**
 * 执行next时，需要使用await
 */
function mwl(ctx){
  console.log('-------------------------------');
  // console.log(ctx);
}
module.exports = function (){
  return async function(ctx,next){
    console.log('m1 start');
    mwl(ctx);
    await next();   //执行下一个中间件，等待执行完毕后继续执行end，这就是koa2的洋葱模型，response的时候执行end
    console.log('m1 end');
  }
}