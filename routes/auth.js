const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.redirect('/auth/login');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await user.comparePassword(password)) {
        req.session.userId = user._id;
        req.session.role = user.role;
        res.redirect('/protected/dashboard');
    } else {
        res.status(400).send('Invalid credentials');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/auth/login');
    });
});

module.exports = router;
