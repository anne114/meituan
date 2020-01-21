const mongoose = require('mongoose');
// 创建集合规则对象
const userSchema = new mongoose.Schema({
  name:String,
  age:Number
});
module.exports = mongoose.model('User',userSchema);