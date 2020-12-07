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

// @route  POST users/:userId
// @desc   Update user.
// @access Private 
router.post('/update/:id', verify, async (req, res) => {
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

    // Return response without password.
    const returnFields = "_id role position name email pictureUrl orgId createdAt updatedAt";

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updatedValues },
      { new: true, runValidator: true, fields: returnFields }
    );
    res.json(updatedUser)
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

  // @TODO: Remove this line later. Just temp code.
  const role = "Member"
  const { name, email, password } = req.body;

  //Check if the user already exists
  const emailExist = await User.findOne({ email: email });
  if (emailExist) return res.status(400).send('Email already exists');

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create a new user
  const newUser = new User({
    role: role,
    name: name,
    email: email,
    password: hashedPassword,
    pictureUrl: ''
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