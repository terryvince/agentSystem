const path = require('path');
const root = path.resolve(__dirname, '../');

module.exports = {
  env: 'development',

  appName: 'agent system (dev)',
  lang: 'en',

  port: 9000,

  root,
  src: path.join(root, 'src'),
  entry: {
    main:path.join(root, 'src', 'main.js')
  },
  output: path.join(root, '.tmp'),

  vendors: ['jquery'],
  proxies: [
    {path: '/api', url: 'http://localhost:3001/api/v1'},
  ],
  browsers:[
    '> 1%',
    'last 2 versions'
  ],
  title:{
    index:'首页',
    noAuth:'无权限',
    agreement: '代理协议',
    agentGame:'选择代理游戏',
    previousStore:'预存房卡',
    agentRegister: '代理注册',
    rechargeCenter: '充值中心',
    agentBind: '代理绑定',
    agentCode: '输入代理码'
  }
};
