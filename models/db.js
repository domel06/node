const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/employeeDB',{ useNewUrlParser:true},(err)=>{
if(!err){
    console.log('connected to database succesfuly')
}else{
    console.log('failed to connect to database'+err);
}
});
require('./employee.model');