const server = require('../lib/server.js')

console.log('works')

module.exports = server.post('test', () => {
  return {text: 'hello-world'}
})