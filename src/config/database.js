const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose.Promise = global.Promise
// string to connect to docker mongo 'mongodb://mongo:27017/nameOfTheDatabase'
// string to connect to localhost mongo 'mongodb://localhost/nameOfTheDatabase'
module.exports = mongoose.connect('mongodb://localhost/db4', { useNewUrlParser: true }).then(() => {
// module.exports = mongoose.connect('mongodb://mongo:27017/gastarme2', { useNewUrlParser: true }).then(() => {
}).catch((err) => {
  console.log(err)
})
