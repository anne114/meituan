module.exports = function (){
  return async function(ctx,next){
    console.log('m2 start');
    await next();
    console.log('m2 end');
  }
}