const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true,
        unique: true,
    },
    password: { 
        type: String,
        required: true,
    },
    confirmPassword: { 
        type: String,
        required: true,
    },
    dob: { 
        type: Date,
        required: true,
    },
    college: { 
        type: String,
        required: true,
    },
    genero: { 
        type: String,
        required: true,
    },
    major: { 
        type: String,
        required: true,
    },
    year: { 
        type: Number,
        required: true,
    },
    friendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    sentFriendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;