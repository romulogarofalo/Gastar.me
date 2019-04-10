const mongoose = require('mongoose')

mongoose.Promise = global.Promise
// string to connect to docker mongo 'mongodb://mongo:27017/nameOfTheDatabase'
// string to connect to localhost mongo 'mongodb://localhost/nameOfTheDatabase'
module.exports = mongoose.connect('mongodb://mongo:27017/gastarme2').then(() => {
  console.log('connected to mongoDB')
}).catch((err) => {
  console.log(err)
  process.exit(1)
})
