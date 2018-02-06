require('babel-core/register')
const router = require('./app.js').router
require('babel-core').transform('code', {
  plugins: ["transform-runtime"]
})

module.exports = {
  path: '/exapi',
  handler: router
}
