require('./models/db')

const express = require('express');
const employeeController = require('./controllers/employeeController');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'mainLayout',layoutsDir:__dirname+'/views/layout/'}));
app.set('view engine','hbs');
app.listen(3000,()=>{
    console.log('express is now listening at:3000')
})
app.use('/employee',employeeController);