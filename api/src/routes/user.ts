import express from 'express';
import controller from '../controllers/user';
import verify from '../middleware/auth';

const router = express.Router();

// @route  POST users/register
// @desc   Register user
// @access Public
router.post('/register', controller.registerUser);

// @route  POST users/login
// @desc   Login user
// @access Public
router.post('/login', controller.loginUser);

// @route  POST users/login
// @desc   Login for demo without validating password.
// @access Public
router.post('/demo_login', controller.demoLoginUser);

// @route  GET users/authenticate
// @desc   Authenticate request from client and return user data when the token is varified.
// @access Private
router.get('/authenticate', verify, controller.authenticateUser);

// @route  POST users/update/:userId
// @desc   Update user.
// @access Private
router.post('/update/:id', verify, controller.updateUser);

// @route  POST users/update/profile/:userId
// @desc   Update user profile.
// @access Private
router.post('/update/profile/:id', verify, controller.updateUserProile);

// @route  POST users/update/role/:userId
// @desc   Update user role.
// @access Private
router.post('/update/role/:id', verify, controller.updateUserRole);

// @route  GET users/org/:org_id
// @desc   Get users in the organization.
// @access Private
router.get('/org/:org_id', verify, controller.getOrgMembers);

export = router;
