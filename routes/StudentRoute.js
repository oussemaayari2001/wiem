const express=require('express');
const router=express.Router();
const jwt = require('jsonwebtoken');
const tabStudentSignIn=[];
var psw=''
const bcrypt= require('bcrypt'); 

router.post('/signup',(req,res)=>{
   
    let body=req.body
    console.log(body);

let student =tabStudentSignIn.find((elm)=>{
  return   elm.username==body.username
})

if (student) {
    //


    res.sendStatus(401)
    res.json({message:'Erreur Username Already exists'})
    //res.end()
} else {
    psw=bcrypt.hashSync(body.password,10)
    let elm={username:body.username,password:psw}

   

    tabStudentSignIn.push(elm)
    console.log(tabStudentSignIn);
    res.statusCode=201
   res.render('signup',{msg:'Sign Up succedded'})

}

    



})
router.get('/signin',(req,res)=>{
    res.render('SignIn',{msg:''})
})

router.post('/signin',(req,res)=>{
    let body=req.body
    console.log(req.body);

let student = tabStudentSignIn.find((elm)=>{
let hash=bcrypt.compareSync(body.password,elm.password)
console.log(hash);
return elm.username==body.username && hash


})
console.log('student :>>',student);

if (student !=undefined) {
    res.statusCode=200


     
        const token = jwt.sign({id: student.username}, "secret")
    
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })
    
    // res.json({message:'login succeded'})
    res.render('user',{msg:student.username+' est connectée',connect:true});
    
} else
 {
    res.statusCode=401
    res.render('signin',{msg:'login failed'})
   
   
    
  }
   

})


router.get('/user',  (req, res) => {
    
        const cookie = req.cookies['jwt']

        const claims = jwt.verify(cookie, 'secret')

        if (!claims) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }

        const user =tabStudentSignIn.find((elm)=>{
            return   elm.username==body.username
          })

        

        res.send(user)
     
})
router.post('/logout', (req,res)=>{
    
    res.cookie('jwt', '', {maxAge: 0})
    res.render('signup',{msg:''})
   
})
router.get('/students',(req,res)=>{
    res.render('users',{tab:tabStudentSignIn,title:'Students'})
})



module.exports=router