const crpto = require('crypto')

const key1 = crypto.randomlyBytes(32).toString('hex')
const key2 = crypto.randomlyBytes(32).toString('hex')
console.table({key1, key2})