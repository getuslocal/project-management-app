import express from 'express';
import controller from '../controllers/organization';
import verify from '../middleware/auth';

const router = express.Router();

// @route  GET organizations/:id
// @desc   Get organization by id.
// @access Private
router.get('/:id', verify, controller.getOrganizationById);

// @route  POST organizations/create
// @desc   Create a new organization.
// @access Private
router.post('/create', verify, controller.createOrganization);

export = router;
