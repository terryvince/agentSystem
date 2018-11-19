const path = require('path');
const root = path.resolve(__dirname, '../');

module.exports = {
  env: 'development',

  appName: 'frontend templet (dev)',
  lang: 'en',

  port: 9000,

  root,
  src: path.join(root, 'src'),
  entry: {
    main:path.join(root, 'src', 'main.js')
  },
  output: path.join(root, '.tmp'),

  // vendors: [],
  proxies: [
    {path: '/api', url: 'http://localhost:3001/api/v1'},
  ],

  browsers:[
    '> 1%',
    'last 2 versions'
  ]
};
