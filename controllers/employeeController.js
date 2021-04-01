var express = require('express');
var mongoose  = require('mongoose');
var router = express.Router();
var Employee = mongoose.model('Employee');

router.get('/',(req,res)=>{
    res.render('employee/addOrEdit',{
        viewTitle:'Insert Employee'
    }); 
});
router.post('/',(req,res)=>{
   if(req.body._id =='')
    insertRecord(req,res);
    else
    updateRecord(req,res);
});


   
function insertRecord(req, res) {
var employee = new Employee();
employee.fullname = req.body.fullname;
employee.email = req.body.email;
employee.mobile = req.body.mobile;
employee.city = req.body.city;
employee.save((err,doc)=>{
 if(!err){
     res.redirect('employee/list');
 }else{
     if(err.name == "ValidationError"){
         handlerValidationError(err,req.body);
         res.render('employee/addOrEdit',{
            viewTitle:'Insert Employee',
            employee:req.body
        });
        }
     else
         console.log('error:'+err);
 }
});
}

function updateRecord(req,res){
   Employee.findOneAndUpdate({_id: req.body._id}, req.body,{new:true},(err,doc)=>{
       if(!err){
           res.redirect("employee/list");
       }else{
           if(err.name == "ValidationError"){
               handlerValidationError(err, req.body);
               res.render("employee/addOrEdit",{
                   viewTitle:'Update Employee',
                   employee: req.body
               })
           }else{
               console.log("error during record update"+err);
           }
       }
   }).lean();
}
router.get('/list',(req,res)=>{
    Employee.find((err,docs)=>{
        if(!err){
            res.render('employee/list',{
                list:docs
            });
        }
        else{
            console.log('error in retrival,on',err);
        }
    }).lean();
     
});

function handlerValidationError(err,body){
for(field in err.errors){
    switch(err.errors[field].path){
        case 'fullname':
            body['fullnameError']=err.errors[field].message;
            break;
        case 'email':
            body['emailError']=err.errors[field].message;
            break;
            default:
            break;
    }
}
};
router.get('/:id',(req,res)=>{
    Employee.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render("employee/addOrEdit",{
                viewTitle:"Update employee",
                employee:doc
            })
        }
    }).lean();
})
router.get('/delete/:id',(req,res)=>{
    Employee.findOneAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/employee/list');
        }else{
            console.log('err'+err);
        }
    })
})

module.exports = router;