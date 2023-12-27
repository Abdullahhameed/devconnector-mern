const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const config = require('config');
const router = express.Router();


// @route   GET api/auth 
// @desc    Test route
// @access  Public

router.get('/', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json('Server Error');
    }
});

// @route   POST api/auth 
// @desc    Authenticated user & get token
// @access  Public

router.post('/', [
    check('email', 'Please include a valid email address').isEmail(),
    check('password', 'Password is required').exists()
], async (request, response) => {

    const errors = validationResult(request)

    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    const { email, password } = request.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return response.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return response.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const payload = {
            user: {
                id: user.id,
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            response.json({ token });
        })
        // response.send('User Registered')
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Server Error');
    }
});

module.exports = router;