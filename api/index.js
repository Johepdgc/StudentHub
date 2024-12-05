const express = require('express');
const bodyParser = require('body-parser');
const moongose = require('mongoose');
const crypto = require('crypto');
const passport = require('passport');
const session = require('express-session');
const multer = require('multer');
const path = require('path');

const app = express();
const ip = "192.168.1.29";
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');

// conexion a mongodb
moongose.connect(
    "mongodb+srv://johepgradis:gradis1@studenhubapp.zmmehhd.mongodb.net/",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000 // Increase timeout to 5 seconds
    }
).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

// npm start para iniciar el servidor
// puerto de escucha del servidor
app.listen(port, () => {
    console.log(`App listening at http://${ip}:${port}`);
});

// llamado de modelos y schemas de mongodb
const User = require('./models/user');
const Post = require('./models/post');
const Message = require('./models/message');

const router = express.Router();

// command + d to show the developer tools
app.use('/uploads', express.static('uploads'));
app.use(passport.initialize());
app.use(session({ secret: 'QWertYuIoP1asd23FG', resave: false, saveUninitialized: true, cookie: { secure: false } }));

// Configuración de multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });


const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, 'QWertYuIoP1asd23FG');
        req.userId = verified.userId;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

app.use('/posts', authMiddleware); // Protección de endpoints relacionados con posts


// endpoint para enviar solicitudes de amistad
app.post('/friendRequest', async (req, res) => {
    const { userId, friendId } = req.body;

    try {
        // agregar un nuevo amigo a la lista de amigos del usuario
        await User.updateOne({ _id: userId }, { $push: { friendRequests: friendId } });

        res.status(200).json({ message: "Solicitud de amistad enviada" });
    } catch (err) {
        res.status(500).json({ message: "Error enviando solicitud de amistad" });
    }
});

// Create a new post
router.post('/', upload.single('image'), async (req, res) => {
    const { title, content } = req.body;
    const imageUrl = req.file ? `http://${ip}:3000/uploads/${req.file.filename}` : null;

    const newPost = new Post({
        title,
        content,
        author: req.userId, // Se obtiene del middleware de autenticación
        imageUrl,
    });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const imageUrl = req.file ? `http://${ip}:3000/uploads/${req.file.filename}` : undefined;

    try {
        const updateData = { title, content };
        if (imageUrl) updateData.imageUrl = imageUrl;

        const post = await Post.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;

// endpoint para el registro del usuario
app.post('/Register', async (req, res) => {
    const { username, email, password, confirmPassword, imageProfile, dob, college, genero, major, year } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "El correo ya esta registrado" });
    }

    // crear un nuevo usuario
    const newUser = new User({
        username,
        email,
        password,
        confirmPassword,
        imageProfile,
        dob,
        college,
        genero,
        major,
        year,
    });

    // guardar el usuario en la base de datos
    newUser.save().then(() => {
        res.status(200).json({ message: "User registered successfully" });
    }).catch((err) => {
        console.log("Error for user registration", err);
        res.status(500).json({ message: "Error registering user" });
    });
});

// funcion para crear una clave secreta
const generateSecretKey = () => {
    // generar una clave secreta
    const secretKey = crypto.randomBytes(32).toString('hex');
    return secretKey;
};
// clave secreta para el token
const secretKey = generateSecretKey();

// endpoint para el login del usuario
app.post('/Login', async (req, res) => {
    const { email, password } = req.body;

    // validar que los campos no esten vacios
    if (!email || !password) {
        return res.status(404).json({ message: "Llenar todos los campos" });
    }

    // buscar el usuario en la base de datos
    await User.findOne({ email }).then((user) => {
        if (!user) {
            // usuario no encontrado
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // comparar la contraseña ingresada con la contraseña del usuario
        if (user.password !== password) {
            return res.status(404).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ userId: user._id }, secretKey);
        res.status(200).json({ token })
    }).catch((err) => {
        console.log("Error encontrando el usuario", err);
        res.status(500).json({ message: "Error de servidor" });
    })
});

// endpoint para acceder a todos los usuarios menos el usuario actual
app.get('/user/:userId', (req, res) => {
    try {
        const loggedInUserId = req.params.userId;

        User.find({ _id: { $ne: loggedInUserId } }).then((users) => {
            res.status(200).json(users);
        }).catch((error) => {
            console.log("Error buscando usuarios", error);
            res.status(500).json({ message: "Error buscando usuarios" });
        })
    } catch (error) {
        res.status(500).json({ message: "Error buscando usuarios" });
    }
});

//endpoint to follow a particular user
app.post("/follow", async (req, res) => {
    const { currentUserId, selectedUserId } = req.body;

    try {
        await User.findByIdAndUpdate(selectedUserId, {
            $push: { friends: currentUserId },
        });

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error al seguir usuario" });
    }
});

//endpoint to unfollow a user
app.post("/users/unfollow", async (req, res) => {
    const { loggedInUserId, targetUserId } = req.body;

    try {
        await User.findByIdAndUpdate(targetUserId, {
            $pull: { friends: loggedInUserId },
        });

        res.status(200).json({ message: "Unfollowed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error unfollowing user" });
    }
});

//endpoint to create a new post in the backend
app.post("/create-post", async (req, res) => {
    try {
        const { content, userId } = req.body;

        const newPostData = {
            user: userId,
        };

        if (content) {
            newPostData.content = content;
        }

        const newPost = new Post(newPostData);

        await newPost.save();

        res.status(200).json({ message: "Post creado" });
    } catch (error) {
        res.status(500).json({ message: "Post fallo en crearse" });
    }
});

//endpoint for liking a particular post
app.put("/posts/:postId/:userId/like", async (req, res) => {
    const postId = req.params.postId;
    const userId = req.params.userId; // Assuming you have a way to get the logged-in user's ID

    try {
        const post = await Post.findById(postId).populate("user", "username");

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $addToSet: { likes: userId } }, // Add user's ID to the likes array
            { new: true } // To return the updated post
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        updatedPost.user = post.user;

        res.json(updatedPost);
    } catch (error) {
        console.error("Error liking post:", error);
        res
            .status(500)
            .json({ message: "An error occurred while liking the post" });
    }
});

//endpoint to unlike a post
app.put("/posts/:postId/:userId/unlike", async (req, res) => {
    const postId = req.params.postId;
    const userId = req.params.userId;

    try {
        const post = await Post.findById(postId).populate("user", "username");

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $pull: { likes: userId } },
            { new: true }
        );

        updatedPost.user = post.user;

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(updatedPost);
    } catch (error) {
        console.error("Error unliking post:", error);
        res
            .status(500)
            .json({ message: "An error occurred while unliking the post" });
    }
});

//endpoint to get all the posts
app.get("/get-posts", async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user", "username")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        res
            .status(500)
            .json({ message: "An error occurred while getting the posts" });
    }
});

app.get("/profile/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error while getting the profile" });
    }
});