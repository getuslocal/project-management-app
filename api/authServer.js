require('dotenv').config()
const { registerValidation, loginValidation } = require('./validation');
const bcrypt = require('bcryptjs');
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const port = 4000;
const User = require('./models/user.model');

app.use(express.json())

// @TODO: Store this in some form of DB.
let refreshTokens = [];

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  // If refresh token is not set return error.
  if (refreshToken == null) return res.sendStatus(401)
  // Check if an upcoming refresh token exists on DB.
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  // Check if refresh token is valid.
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ _id: user._id })
    res.json({ accessToken: accessToken })
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

// @route  POST users/login
// @desc   Login user 
// @access Public 
app.post('/login', async (req, res) => {

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
    // Generate access token with user id.
    const accessToken = generateAccessToken(userId)
    // Generate refresh token.
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '3d' })
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })

  } catch (err) {
    res.status(500).send('Server error' + err);
  }
});

function generateAccessToken(userId) {
  return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});