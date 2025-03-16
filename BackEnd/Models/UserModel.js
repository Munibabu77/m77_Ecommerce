const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const userSchema = new mongoose.Schema({
    name: { type: String },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        unique: true
    },
    Ordered_Items: [
        {
            id: Number,
            name: String,
            amount: Number,
            price: Number,
        }
    ],
    Address_details: {
        type: String,
    },
    Cart_Items: [
        {
            id: Number,
            name: String,
            amount: Number,
            price: Number,
        }
    ],
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


userSchema.statics.login = async function (name, password) {
    try {
        const user = await this.findOne({ name });
        // console.log("from model" ,user);
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                return user;
            }
            throw Error("In correct password");
        }
        throw Error("User not found");
    }
    catch (error) {
        throw error;
    }
};


const User = mongoose.model('User', userSchema);
module.exports = User;