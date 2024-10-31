const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
const { error } = require("console");
const { type } = require("os");

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb+srv://sanketks200305:xUkG4DBtFBrrBwrE@e-commerse.thx6c.mongodb.net/?retryWrites=true&w=majority&appName=E-Commerse");

// API creation
app.get("/", (req, res) => {
    res.send("Express app is running");
});

// Image storage engine
const storage = multer.diskStorage({
    destination: './upload',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint for images
app.use("/images", express.static("upload"));

app.post("/upload", upload.single('Product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema for Creating Products
const Product = mongoose.model("product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }
});

app.post('/addproduct', async (req, res) => {
    try {
        let products = await Product.find({});
        let id;

        if (products.length > 0) {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        } else {
            id = 1;
        }

        // Create a new instance of the Product model
        const newProduct = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        // Save the new product
        await newProduct.save();
        console.log("Saved");

        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

//API for deleting product
app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Removed");
        res.json({
            success: true,
            message: "Product removed successfully",
        });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

//Creating API for getting all products
app.get('/allproducts',async (req,res)=>{
    const products=await Product.find({});
    console.log("All products fetched");
    res.send(products);
})

// Schema creating for User model
const Users=mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    },
})

// Creatring Endpoint for user registration
app.post('/signup',async (req,res)=>{

    let check=await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with sdame email address"})
    }
    let cart={}
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    const user =new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();

    const data={
        user:{
            id:user.id
        }
    }

    const token=jwt.sign(data,'secret_ecom');
    res.json({success:true,token});
})

// Creating Endpoint for user login
app.post('/login',async (req,res)=>{
    let user=await Users.findOne({email:req.body.email});
    if(user){
        const passComapare=req.body.password===user.password;
        if(passComapare){
            const data ={
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong password"});
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email Id"});
    }
})

// Creating endpoint for newcollection data
app.get('/newcollections',async (req,res)=>{
    let products= await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

// Creating endpoint for popular in women data
app.get('/popularinwomen',async (req,res)=>{
    let products= await Product.find({category:"womens"});
    let popular_in_women=products.slice(0,4);
    console.log("Popular in woomen fetched");
    res.send(popular_in_women);
})

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ errors: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        console.error("Token verification error:", error); // Log the error for debugging
        return res.status(401).json({ errors: "Please authenticate using a valid token" });
    }
};


// Creating endpoint for adding products in cart
app.post('/addtocart',fetchUser ,async (req,res)=>{
    console.log("Added",req.body.itemId);
    let userData= await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");
})

// Creating endpoint for removing products in cart
app.post('/removefromcart',fetchUser ,async (req,res)=>{
    console.log("Removed",req.body.itemId);
    let userData= await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
        userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed");
})

// creating endpoint for fetching cart data of user
app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("Get cart");
    let userData=await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on port " + port);
    } else {
        console.log(error);
    }
});
