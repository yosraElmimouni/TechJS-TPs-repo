const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("./mongodbConnexion"); // ton modèle
require("dotenv").config();

const app = express();
app.use(express.json());

// Secret pour le token (tu peux le mettre dans .env)
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// ------------------------------------------
// REGISTER
// ------------------------------------------
app.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new Users({ username, password: hashedPassword, email });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------------------------------
// LOGIN
// ------------------------------------------
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    // Créer un token JWT
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------------------------------
// MIDDLEWARE pour vérifier le token
// ------------------------------------------
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied, token missing" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

// ------------------------------------------
// BOOKS SECTION (protégée)
// ------------------------------------------
app.get("/books", authenticateToken, (req, res) => {
  const books = [
    { id: 1, title: "Clean Code", author: "Robert C. Martin" },
    { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt" },
  ];
  res.json({ message: `Welcome ${req.user.username}`, books });
});

// ------------------------------------------
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
