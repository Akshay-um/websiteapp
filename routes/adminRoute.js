const express = require("express");
const admin_route = express();


admin_route.set('view engine','ejs');
admin_route.set('views','./views/admin');



const adminController = require("../controllers/adminController");
const productController =require("../controllers/productController");
const categoryController= require("../controllers/categoryController")


admin_route.get('/',adminController.adminload);
admin_route.post('/',adminController.adminVerify);
admin_route.get('/adminhome',adminController.adminhome);
admin_route.get('/userpage',adminController.userlistpage);
admin_route.get('/logout',adminController.adminLogout);
admin_route.get("/blockUser/:userId",adminController.blockUser)
admin_route.get("/unblockUser/:userId",adminController.unblockUser)
//-----product------
admin_route.get('/product',productController.productload);
admin_route.get('/newproduct',productController.addproduct)




//-------category----
admin_route.get('/category',categoryController.categoryload);


module.exports = admin_route;