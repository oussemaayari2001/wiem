const express=require('express')
const app=express()
app.set('view engine','ejs')
const fs=require('fs')
const port=process.argv[2]||process.env.PORT||3000
const studentroute=require('./routes/StudentRoute');
app.use(express.json());
app.use(express.urlencoded());

app.use('/', express.static('./public'));
app.use('/',studentroute);
// app.get('/about',(req,res)=>{

//  let data= fs.readFileSync('./pages/about.html')
 
// res.end(data)
       

// })
// app.get('/about-us',(req,res,next)=>{
//     res.redirect('/about');
//     res.end()
// })
// app.post('/data',(req,res)=>{
// let body =req.body
// console.log(typeof(body));
// body = JSON.stringify(body)
// console.log(typeof(body));
// res.send(body)
// res.end()
// })
// app.use((req,res)=>{
//     let data= fs.readFileSync('./pages/error.html')
   
//     res.end(data)
// })

app.use((req,res)=>{
    res.render('SignUp',{msg:''})
    
})
app.listen(port,'localhost');

console.log(`server is listenning on : http://localhost:${port}`);
