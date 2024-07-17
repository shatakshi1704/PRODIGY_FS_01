const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/dashboard', authMiddleware, (req, res) => {
    res.render('dashboard', { user: req.session.username });
});

module.exports = router;
