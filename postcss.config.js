const {env, browsers} = require('config');
const isProd = env === 'production';

module.exports = {
  plugins: {
    'postcss-preset-env': {browsers},    //添加前缀
    'postcss-sprites': false,
    'cssnano': isProd ? {} : false,       //压缩css文件，移除注释，空白，重复规则
  }
};
