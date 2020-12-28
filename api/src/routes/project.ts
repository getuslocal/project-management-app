import express from 'express';
import controller from '../controllers/project';
import verify from '../middleware/auth';

const router = express.Router();

// @route  GET projects/:id
// @desc   Get project by organization id.
// @access Private
router.get('/:org_id', verify, controller.getProjectByOrgId);

// @route  POST projects/create
// @desc   Create a new project.
// @access Private
router.post('/create', verify, controller.createProject);

// @route  POST projects/update/tickets_order/:id
// @desc   Update ticket order within the column
// @access Private
router.post('/update/:id', verify, controller.updateProject);

// @route  POST projects/:id
// @desc   Delete a project.
// @access Private
router.delete('/:id', verify, controller.deleteProject);

// @route  POST projects/update/tickets_order/:id
// @desc   Update ticket order within the column
// @access Private
router.post('/update/history/:id', verify, controller.updateProjectHistory);

// @route  POST projects/update/column_order/:id
// @desc   Update column order of the project board.
// @access Private
router.post(
  '/update/column_order/:id',
  verify,
  controller.updateProjectColumnOrder
);

// @route  POST projects/update/tickets_order/:id
// @desc   Update ticket order within the column or between two columns.
// @access Private
router.post(
  '/update/tickets_order/:id',
  verify,
  controller.updateProjectIssuesOrder
);

// @route  POST projects/update/tickets_status/:id
// @desc   Update tickets order when issue status of an existng ticket is changed.
// @access Private
router.post(
  '/update/ticket_status/:id',
  verify,
  controller.updateProjectIssueStatus
);

// @route  POST projects/update/taskids/:id
// @desc   Create a new ticket and assign it to a proper location.
// @access Private
router.post('/update/taskids/:id', verify, controller.updateProjectTaskIds);

// @route  POST projects/delete/taskids/:id
// @desc   Update the column taskIds array.
// @access Private
router.post('/delete/taskids/:id', verify, controller.deleteProjectTaskIds);

export = router;
