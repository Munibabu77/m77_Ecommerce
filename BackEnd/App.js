require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./Models/UserModel');
const jwt = require('jsonwebtoken');
// const router = require('./routes');
const cookieParser = require('cookie-parser');
// const authMiddleware = require("./routes/authMiddleware")

const maxAge = 3 * 24 * 60 * 60;
const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    // methods:[" POST","GET"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
// app.use(authMiddleware);


mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log("Connected to Mongodb")
    })
    .catch((err) => {
        console.log(err);
    })

const accessToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: maxAge,
    })
}

const authMiddleware = async (req, res, next) => {
    // try{
        const token =req.headers.authorization;
        console.log(token, 
            "from middleWare")
        if(token){
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, decodedToken) =>{
                if(err){
                    return res.status(401).json({error:'Unauthorized, Invalid token'})
                }else{
                    req.userId = decodedToken.id;
                    next()
                }
            })  
        }else{
            res.status(401).json({error:'Unauthorized'})
        }
        
        // const userId = decodedToken.id;
        // const user = await User.findById(userId);
        // req.user = user;
        // next();
    // }
    // catch(err){
    //     console.log("Authentication error");
    //     return res.status(401).json({error:'Unauthorized'})
    // }
};


app.post('/Users', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' })
        }
        const newUser = new User({
            name,
            email,
            password,
        });

        const token = accessToken(newUser._id);
        // console.log(token)

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        })
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', accessToken: token });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Error' });
    }
});

app.post('/login', async (req, res, next) => {
    // console.log(req.body)
    try {
        const { name, password } = req.body;
        // console.log(req.body)
        const user = await User.login(name, password);
        if (user) {
            const token = accessToken(user._id);
            console.log(token, "from 109")
            res.cookie("jwt", token, {
                withCredentials: true,
                httpOnly: false,
                maxAge: maxAge * 1000,
            })
            res.status(200).json({ user, token, created: true });
        }
    } catch (err) {
        console.log(err)
        if(err.message === "In correct password" || err.message === "User not found" ){
            res.status(404).json({ error:err.message })
        }else{
            res.status(500).json({ error: 'Internal server error' })
        }
    }
})

app.post("/order",authMiddleware,async(req, res) =>{
    try{
        const {Address, orderDetails, Id} = req.body;
        // console.log(req.body, "from order 130");
        const user = await User.findById(Id);
        console.log(user)
        if(user){
           user.Ordered_Items.push(...orderDetails);
           user.Address_details = Address;
           await user.save();
           res.status(200).json({message: "Order Placed successfully"});
        }else{
            res.status(404).json({Error: "User not found"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: "Internal Error"});
    }
});


app.post('/cartItems',authMiddleware, async (res, req) =>{
    try{
        const {cartItems, Id} =req.body;
        const user = await User.findById(Id);
        if(user){
            user.Cart_Items.push(...cartItems);
            await user.save();
            res.status(200).json({message:'Items added to cart DB'})
        }else{
            res.status(404).json({Error: "User not found"});
        }
    }
    catch(err){
        console.log(err);
    }
})



app.listen(process.env.PORT, () => {
    console.log(`Server running on localhost ${process.env.PORT} `);
});