import express from 'express';
import verify from '../middleware/auth';
import controller from '../controllers/demo';

const router = express.Router();

// @route  POST demo/generate
// @desc   Generate demo all the demo data.
// @access Private
router.post('/generate', verify, controller.generateDemoData);

export = router;
