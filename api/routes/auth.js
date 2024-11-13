const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  // Import jsonwebtoken
const User = require('../models/User');  // Correct path to User model
const router = express.Router();

// Secret key for JWT signing (you should keep it in environment variables)
const JWT_SECRET = 'your-secret-key';  // Replace with an environment variable in production

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance and save it to the database
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate a JWT token after successful signup
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    // Send the token back to the client
    res.status(201).json({ message: 'User created successfully', token });
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the hashed password with the provided password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token after successful login
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Send the token back to the client
    res.status(200).json({ message: 'Login successful', token });
});

module.exports = router;
