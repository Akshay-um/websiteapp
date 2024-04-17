//connect database
const mongoose=require('mongoose');
require('dotenv/config');
mongoose.connect(process.env.DS_PORT)
   .then(()=>{
    console.log('Database Connected');
   })
   .catch((error)=>{
    console.error('Error is',error);
   })


const express=require('express');
const app=express();
const path=require('path');
const session=require('express-session')
const port=process.env.PORT;

app.use(session({
    secret: 'mysitesessionsecret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 3600000 
    }
}));


app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public/user')));
app.use('/admin',express.static(path.join(__dirname, 'public/admin')));
app.use('/public', express.static(path.join(__dirname, 'public')));


//user 
const userRoute = require('./routes/userRoute');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', userRoute);

//admin

const adminRoute = require('./routes/adminRoute');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/admin', adminRoute);



app.listen(port,()=>{
    console.log(`Server is running http://localhost:${port}`)
})