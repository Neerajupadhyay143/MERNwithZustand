const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// to store users

let users = [];
// API route
app.post('/register', (req, res) => {
    const newUsers = req.body
    users.push(newUsers);
    // console.log("Current Users:", users);
    res.json({ message: "User registered successfully!", users: newUsers });
});

app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const loginUser = users.find(u => u.email === email && u.password === password);
    if (loginUser) {
        res.json({
            message: "Login successful!",
            username: loginUser.username,
        })

        const existingUser = users.find(
            u => u.email === newUser.email || u.username === newUser.username
        );
        if (existingUser) {
            return res.status(409).json({ message: "User already registered with this email!" });
        }
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
})

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
