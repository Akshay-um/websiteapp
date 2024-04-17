const Admin = require('../models/adminModel');
const User =require('../models/userModel')

const adminload = async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const adminhome = async (req, res) => {
    try {
        res.render('home');
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const adminVerify = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({email:email});
        if (!admin) {
            return res.render('login', { message: 'Email not found!' });
        }

        if (email === admin.email && password === admin.password) {
            return res.redirect('/admin/adminhome');
        } else {
            return res.render('login', { message: 'Email and password incorrect!' });
        }
    } catch (err) {
        console.log('admin verify', err.message);
        res.status(500).send('Server Error');
    }
}



const userlistpage = async (req, res) => {
    try {
        const userData = await User.find()
        res.render('userlist', { userData })
    } catch (error) {
        console.log(error.message)
    }
}


const adminLogout = async (req, res) => {
    try {
        req.session.admin = false;
        res.redirect("/admin");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

//------block and unblock users
const blockUser= async(req,res) =>{
    const userId = req.params.userId
    try {
        await User.findByIdAndUpdate(userId, { $set: { is_blocked: true } })

        res.redirect('/admin/userpage');
        
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}
const unblockUser = async (req, res) => {
    const userId = req.params.userId
    try {
        await User.findByIdAndUpdate(userId, { $set: { is_blocked: false } })

        res.redirect('/admin/userpage');

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}









module.exports = {
   adminload,
   adminhome,
   adminLogout,
   adminVerify,
   userlistpage,
   blockUser,
   unblockUser
}