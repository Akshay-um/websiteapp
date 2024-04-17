const productModel= require('../models/productModel');


const productload = async (req, res) => {
    try {
        res.render('productpage');
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
}


const addproduct = async (req, res) => {
    try {
        res.render('addproduct');
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
}






module.exports={
    productload,
    addproduct
}