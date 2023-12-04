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

// conexion a mongodb
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

// llamado de modelos y schemas de mongodb
const User = require('./models/user');
const Message = require('./models/message');

// endpoint para el registro del usuario
app.post('/Register', (req, res) => {
    const { username, email, password, confirmPassword, dob, college, genero, major, year } = req.body;

    // crear un nuevo usuario
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
    
    // guardar el usuario en la base de datos
    newUser.save().then(() => {
        res.status(200).json({message:"User registered successfully"});
    }).catch((err) => {
        console.log("Error for user registration",err);
        res.status(500).json({message:"Error registering user"});
    });
});

// funcion para crear el token
const createToken = (userId) => {
    // crear el payload token con el id del usuario
    const payload = { userId: userId, };

    // generar el token secreto
    const token = jwt.sign(payload, "QWertYuIoP1asd23FG", { expiresIn: "1h" });
    return token;
};

// endpoint para el login del usuario
app.post('/Login', (req, res) => {
    const { email, password } = req.body;

    // validar que los campos no esten vacios
    if(!email || !password){
        return res.status(404).json({message:"Llenar todos los campos"});
    }

    // buscar el usuario en la base de datos
    User.findOne({ email }).then((user) => {
        if(!user){
            // usuario no encontrado
            return res.status(404).json({message:"Usuario no encontrado"});
        }

        // comparar la contraseña ingresada con la contraseña del usuario
        if(user.password !== password){
            return res.status(404).json({message:"Contraseña incorrecta"});
        }

        const token = createToken(user._id);
        res.status(200).json({token})
    }).catch((err) => {
        console.log("Error encontrando el usuario",err);
        res.status(500).json({message:"Error de servidor"});
    })
});