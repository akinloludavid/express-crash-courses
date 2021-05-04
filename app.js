const express = require('express')
const path = require('path')
const app = express()
const logger = require('./middleware/logger')
const router = require('./api/members')
const exphbs = require('express-handlebars');
const members = require('./database.json')

//Handlebars mIDDLEWARE
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'));
//app.use(logger)
//Body parse middleware
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))



app.get('/', (req, res) => res.render('index', {
  title: 'Member App',
  members
}))
app.use('/api/members', router)
//Set static folder
app.use(express.static(path.join(__dirname, 'public')))


const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('Server started at port: ' + port)
})