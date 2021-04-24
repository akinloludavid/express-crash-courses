const express = require('express')
const path = require('path')
const app = express()
const logger = require('./middleware/logger')
const router = require('./api/members')
const exphbs = require('express-handlebars');
const members = require('./database.json')

//app.use(logger)
//Body parse middleware
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))

//Handlebars mIDDLEWARE
app.engine('handlers', exphbs())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => res.render('./views/index', {
  title: 'Member App',
  members
}))
app.use('/api/members', router)
//Set static folder
app.use(express.static(path.join(__dirname, 'public')))


const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log('Server started at port: ' + port)
})