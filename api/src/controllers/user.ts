import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/config';
import {
  registerValidation,
  loginValidation,
  updateValidation,
} from '../utils/validation';
import { defaultUserProfilePic, roleType } from '../constants/constants';
import { generateAccessToken } from '../utils/authToken';

// Register user
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
      pictureUrl: defaultUserProfilePic,
    });

    const savedUser = await newUser.save();
    const token = jwt.sign(
      { _id: savedUser._id },
      config.server.token.accessSecret,
      { expiresIn: config.server.token.expireTime }
    );
    res.json({ token: token });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Login user
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  //Validate a user before store the user inputs
  const { error } = loginValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    const { email, password } = req.body;
    //Check if the user already exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Email or password is wrong');
    //Check password is correct
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Email or password is wrong');

    const userId = { _id: user._id };
    const token = generateAccessToken(userId);
    res.json({ token: token });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Login for demo without validating password.
const demoLoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    //Check if the user already exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Email or password is wrong');

    const userId = { _id: user._id };
    const token = generateAccessToken(userId);
    res.json({ token: token });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Authenticate request from client and return user data when the token is varified.
const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id: uid } = res.locals.user;
    const user = await User.findById(uid).select('-password');

    if (!user) return res.status(400).send('User not found.');

    res.json(user);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

// Update user.
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const formData = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: formData },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Update user profile.
const updateUserProile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      { new: true, runValidators: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Update user role.
const updateUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const newRole = req.body.role;

    // If a new role is not one of the valid roles, return error.
    if (!Object.values(roleType).includes(newRole)) {
      return res.status(400).send('Non valid role');
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { role: newRole } },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get users in the organization.
const getOrgMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orgId = req.params.org_id;
    const users = await User.find({ orgId: orgId }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(400).send(err);
  }
};

export default {
  registerUser,
  loginUser,
  demoLoginUser,
  authenticateUser,
  updateUser,
  updateUserProile,
  updateUserRole,
  getOrgMembers,
};
