const path = require('path');
const root = path.resolve(__dirname, '../');

module.exports = {
  env: 'development',

  appName: 'agent system (dev)',
  lang: 'zh_CN',

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
  rules:[
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'fast-css-loader'
      ],
    },
    {
      test: /\.scss|sass$/,
      use: [
        'style-loader',
        'fast-css-loader',
        'fast-sass-loader'
      ]
    },
    {
      test: /\.less$/,
      use: [
        'style-loader',
        'fast-css-loader',
        'less-loader'
      ]
    },
    {
      test: /\.styl$/,
      use: [
        'style-loader',
        'fast-css-loader',
        'stylus-loader'
      ]
    }
  ],
  resolve: {
    extensions: ['.js', '.json'],
    modules: [
      path.join(root,'src'),
      path.join(root,'node_modules')
    ]
  },
  title:{
    test:'测试页',
    index: '主页',
    noAuth:'无权限',
    agreement: '代理协议',
    agentGame:'选择代理游戏',
    previousStore:'预存房卡',
    selectAgent: '选择代理',
    rechargeCenter: '充值中心',
    agentBind: '代理绑定',
    agentCode: '输入代理码',
    agentRegister: '代理注册',
    buyQuanCard: '充值圈卡',
    myNextAgent: '我的下级代理',
    myGamer: '我的玩家',
    rechargeView:'直充业绩查询',
    personalCenter:'个人中心',
    myFamily: '我的亲友圈',
    moreAction:'更多操作',
    cardOrder: '充圈卡、圈卡订单/记录',
    register: '创建登录账号',
    paySet: '支付设置',
    dividend:'分红',
    dividendDetail: '分红详情'
  }
};
