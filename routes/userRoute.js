const express = require("express");
const user_route = express();
//const auth = require("../middleware/userauth");


user_route.set('view engine','ejs');
user_route.set('views','./views/user');



const userController = require("../controllers/userController");


user_route.get('/',userController.loadLHome);
user_route.get('/login',userController.loginload);
user_route.get('/register',userController.loadRegister);
user_route.get('/home',userController.loadHome);
user_route.post('/register',userController.registerUser);
user_route.post('/login',userController.verifylogin);

user_route.get('/logout',userController.userlogout);

user_route.get('/otp',userController.otpload);
user_route.post('/otp',userController.postOtp);
// user_route.post('/otp', userController.insertUser);


module.exports = user_route;