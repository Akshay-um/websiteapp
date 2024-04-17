const User = require('../models/userModel');
const genrateOtp=require("../controllers/otpGenrator")
require('dotenv/config')




const loginload = async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
}




const loadRegister = async(req,res)=>{
    try{
    
        res.render('register');
    } catch(error){
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
}
const loadHome = async(req,res)=>{
    try{
    
        res.render('home');
    } catch(error){
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
}
const loadLHome = async(req,res)=>{
    try{
    
        res.render('landingpage');
    } catch(error){
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
}
//logout
const userlogout = async (req, res) => {
    try {
       

       
        req.session.destroy((err) => {
            if (err) {
                console.log("Error destroying session:", err);
                res.status(500).send('Internal Server Error');
            } else {
                res.redirect('/');
            }
        });
    } catch (error) {
       console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
}

const registerUser=async (req, res) => {
    try {
        
        
        
        const otp=genrateOtp.generateOTP()
        console.log(otp);

        const {name,email,mobile,password} = req.body

        req.session.Data={
            name,email,mobile,password,otp
        }

        console.log(req.session.Data);

        genrateOtp.SentMail(req.session.Data.email,otp)
        res.redirect('/otp');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};






const verifylogin =async (req, res) => {
    try {
        const { email, password } = req.body;
       
        // Check if user exists
        const user = await User.findOne( { email: email } );
        console.log(user)
        if (!user) {
            
            return res.status(404).json({ error: "User not found" });
        }

        // Check if password matches
        if (password !== user.password) {
            console.log('hello');
            return res.status(401).json({ error: "Incorrect password" });
        }

        // If user exists and password is correct, redirect to home page or send a success response
        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const otpload = async (req, res) => {
    try {
        res.render('otp');
    } catch (error) {
        console.log(error.message);
    }
}

const postOtp=async(req,res)=>{
    try{
        
        
        const data = req.body
      
        const sessionData = req.session.Data

        console.log(data.otp,sessionData.otp);
       
    
        if(data.otp===sessionData.otp){

           

            const userData = await req.session.Data
            const user = new User(userData)

            await user.save()
            
            return res.redirect('/home'); 
        }
        else{
            return res.status(400).json({error:"otp invalid"}); 
        }
    
    }
    catch(error){
        console.log(error.message);
    }
}
    








module.exports = {
    loadRegister,
    loginload,
    loadHome,
    registerUser,
    verifylogin,
    loadLHome,
    otpload,
    userlogout,
    postOtp
  
}