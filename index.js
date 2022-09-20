/* SERVER */
const server = require('./server/lib/server.js')

require('./server/route/test.js')

server.serve(4200)
console.clear()