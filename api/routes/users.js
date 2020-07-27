const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { registerValidation, loginValidation } = require('../validation');
const verify = require('../middleware/auth');

// @route  GET api/profile/authenticate
// @desc   Authenticate request from client and return user data when the token is varified.
// @access Private 
router.get('/authenticate', verify, (req, res) => {
    User.findById(req.user._id) // use userid stored on jwt as payload
        .then(user => res.json(user))// return all its user data on db
        .catch(err => res.status(400).json('Error: ' + err));
})

// @route  GET api/profile/authenticate
// @desc   Get all the users on db
// @access Public 
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route  GET api/profile/me
// @desc   Get a particular user based on id
// @access Public 
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route  POST /users/register
// @desc  Register user 
// @access Public 
router.post('/register', async (req, res) => {

    //Validate a user before store the user inputs
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if the user already exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const newUser = new User({
        picture: req.body.picture,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await newUser.save();
        // res.json(savedUser._id)
        const token = jwt.sign({ _id: savedUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
        res.json({ token: token });
    } catch (err) {
        res.status(400).send(err);
    }
});


// @route  POST /users/signin
// @desc  Signin user 
// @access Public 
router.post('/signin', async (req, res) => {

    //Validate a user before store the user inputs
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if the user already exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password is wrong');
    //Check password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email or password is wrong !!');

    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
    // res.header('auth-token', token).send({ token: token });
    res.json({ token: token });
    // res.json({userId : user._id});
});


module.exports = router;