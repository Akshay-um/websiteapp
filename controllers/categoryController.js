const categoryModel =require('../models/categoryModel');


const categoryload = async (req, res) => {
    try {
        res.render('category');
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
}





module.exports={
    categoryload
}