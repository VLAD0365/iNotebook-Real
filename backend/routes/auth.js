const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();
const JWT_SECRET = 'DB0fN0M4N';
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

//Route:1 Create a User using: Post "/api/auth/createuser". No Login required
router.post('/createuser', [
    body('Name', 'Please Enter the Name').isLength({ min: 3 }),
    body('Email', 'Enter the Valid Password').isEmail(),
    body('Password', 'Password Must be at Least 8 Characters').isLength({ min: 8 })
], async (req, res) => {
    //If tere are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.Password, salt);
    //Check whether the user with this email already exists!
    // ... previous code ...

    // Check whether the user with this email already exists
    try {
        const user = await User.create({
            Name: req.body.Name,
            Email: req.body.Email,
            Password: secPass
        });

        // JWT Auth token
        const data = {
            user: {
                id: user.id,
            },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ authtoken,success });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern.Email) {
            res.status(400).json({ message: 'Email is already in use!' });
        } else if (error.code === 11000 && error.keyPattern.Name) {
            res.status(400).json({ message: 'Name is already in use!' });
        } else {
            // Handle other errors or provide a generic message
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
})

//Route:2 Create a User using: Post "/api/auth/login". No Login required
router.post('/login', [
    body('Email', 'Enter a Valid Email').isEmail(),
    body('Password', 'Please enter the Password').isLength({ min: 8 }),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ Email: req.body.Email });

        if (!user) {
            success = false
            return res.status(400).json({ error: 'Please enter the correct credentials Of Email' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(req.body.Password, user.Password);
        if (!isPasswordValid) {
            success = false;
            return res.status(400).json({ success , error: 'Please enter the correct credentials Of Password' });
        }

        // JWT Auth token
        const data = {
            user: {
                id: user.id,
            },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ authtoken,success });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//Route:3 Get Loggedin User Details Using: POST "/api/auth/getuser" .Login Required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        UserId = req.user.id;
        const user = await User.findById(UserId).select("-Password")
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

module.exports = router