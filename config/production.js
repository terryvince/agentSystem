const path = require('path');

module.exports = {
  env: 'production',

  appName: 'agent system',

  output: path.resolve(__dirname, '../dist'),

  browsers:[
    '> 1%',
    'last 2 versions',
    // 'Firefox > 20',
    'not ie <= 8',
    'iOS >= 6',
    'Android > 4.1'
  ]
};
