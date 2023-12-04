const express = require('express');
const bodyParser = require('body-parser');
const moongose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require('jsonwebtoken');

moongose.connect(
    "mongodb+srv://johepgradis:gradis1@studenhubapp.zmmehhd.mongodb.net/",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

const User = require('./models/user');
const Message = require('./models/message');

// endpoint for registration of the user
app.post('/Register', (req, res) => {
    const { username, email, password, confirmPassword, dob, college, genero, major, year } = req.body;

    //create a new user
    const newUser = new User({
        username,
        email,
        password,
        confirmPassword,
        dob,
        college,
        genero,
        major,
        year,
    });
    //save the user
    newUser.save().then(() => {
        res.status(200).json({message:"User registered successfully"});
    }).catch((err) => {
        console.log("Error for user registration",err);
        res.status(500).json({message:"Error registering user"});
    });
});