const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { registerValidation, loginValidation, updateValidation } = require('../validation');
const verify = require('../middleware/auth');

// @route  GET users/authenticate
// @desc   Authenticate request from client and return user data when the token is varified.
// @access Private 
router.get('/authenticate', verify, (req, res) => {
  User.findById(req.user._id).select('-password') // use userid stored on jwt as payload
    .then(user => res.json(user))// return all its user data on db
    .catch(err => res.status(400).json('Error: ' + err));
})

// @route  GET users/:userId
// @desc   Get user by id.
// @access Private 
router.get('/:userId', verify, (req, res) => {
  User.findById(req.params.userId).select('-password')
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
})

// @route  POST users/update/:userId
// @desc   Update user.
// @access Private 
router.post('/update/:id', verify, async (req, res) => {
  try {
    const userId = req.params.id;
    const formData = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: formData },
      { new: true, runValidator: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// @route  POST users/update/profile/:userId
// @desc   Update user profile.
// @access Private 
router.post('/update/profile/:id', verify, async (req, res) => {
  try {
    const userId = req.params.id;
    const formData = req.body;

    const updatedValues = {
      name: formData.name,
      email: formData.email,
      position: formData.position,
      pictureUrl: formData.pictureUrl,
    };

    // Validate username and email.
    const { error } = updateValidation(updatedValues);

    if (error) return res.status(400).send(error.details[0].message);

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updatedValues },
      { new: true, runValidator: true }
    ).select('-password');;

    res.json(updatedUser)
  } catch (err) {
    res.status(400).send(err);
  }
});

// @route  POST users/update/role/:userId
// @desc   Update user role.
// @access Private 
router.post('/update/role/:id', verify, async (req, res) => {
  try {
    const roles = ['Admin', 'Project Manager', 'Member'];
    const newRole = req.body.role;
    // If a new role is not one of the valid roles, return error.
    if (!roles.includes(newRole)) return res.status(400).send('Not valid role');

    const user = await User.findById(req.params.id).select('-password');

    user.role = newRole;

    const savedUser = await user.save();

    res.json(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
})

// @route  GET users/org/:org_id
// @desc   Get users in the organization.
// @access Private 
router.get('/org/:org_id', verify, (req, res) => {
  User.find({ orgId: req.params.org_id }).select('-password')
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
})

// @route  POST users/register
// @desc   Register user 
// @access Public 
router.post('/register', async (req, res) => {

  //Validate a user before store the user inputs
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password } = req.body;

  //Check if the user already exists
  const emailExist = await User.findOne({ email: email });
  if (emailExist) return res.status(400).send('Email already exists');

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create a new user
  const newUser = new User({
    name: name,
    email: email,
    password: hashedPassword,
    pictureUrl: "https://i.ibb.co/k6c1RR5/default-profile.png", // Default user pic.
  });

  try {
    const savedUser = await newUser.save();
    const token = jwt.sign({ _id: savedUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
    res.json({ token: token });
  } catch (err) {
    res.status(400).send(err);
  }
});


// @route  POST users/login
// @desc   Login user 
// @access Public 
router.post('/login', async (req, res) => {

  //Validate a user before store the user inputs
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;
  try {
    //Check if the user already exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Email or password is wrong');
    //Check password is correct
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Email or password is wrong');

    const userId = { _id: user._id }
    const token = generateAccessToken(userId);
    res.json({ token: token });
  } catch (err) {
    res.status(500).send('Server error');
  }
});


// @route  POST users/login
// @desc   Login for demo without validating password.
// @access Public 
router.post('/demo_login', async (req, res) => {
  try {
    const { email } = req.body;
    //Check if the user already exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Email or password is wrong');

    const userId = { _id: user._id }
    const token = generateAccessToken(userId);
    res.json({ token: token });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

function generateAccessToken(userId) {
  return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' })
};

// router.post('/token', (req, res) => {
//   const refreshToken = req.body.token
//   // If refresh token is not set return error.
//   if (refreshToken == null) return res.sendStatus(401)
//   // Check if an upcoming refresh token exists on DB.
//   // if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

//   // Check if refresh token is valid.
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403)
//     const accessToken = generateAccessToken({ _id: user._id })
//     res.json({ accessToken: accessToken })
//   })
// })


// function generateRefreshToken(userId) {
//   return  jwt.sign(userId, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
// };


module.exports = router;