const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Project = require('../models/project.model');
const verify = require('../middleware/auth');

// @route  GET projects/:ownerId
// @desc   Get projects of the user.
// @access Public 
router.get('/:ownerId', (req, res) => {
  Project.find({ owner: req.params.ownerId })
    .then(project => res.json(project))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route  POST projects/login
// @desc   Create a new project. 
// @access Public 
router.post('/create', async (req, res) => {
  const { key, owner, name, members } = req.body;

  const defaultColumns = {
    'column-1': {
      id: 'column-1',
      title: 'TO DO',
      // @todo : Remove this when create a new project button.
      taskIds: ['5f3e0819b46546bd09617dbb', '5f3e082cb46546bd09617dbc', '5f3e0837b46546bd09617dbd', '5f3e083ab46546bd09617dbe'],
    },
    'column-2': {
      id: 'column-2',
      title: 'IN PROGRESS',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'IN REVIEW',
      taskIds: [],
    },
    'column-4': {
      id: 'column-4',
      title: 'DONE',
      taskIds: [],
    },
  }

  const columnOrder = ['column-1', 'column-2', 'column-3', 'column-4'];

  //Create a new project
  const newProject = new Project({
    key: key,
    owner: owner,
    name: name,
    members: members,
    columns: defaultColumns,
    columnOrder: columnOrder,
  });

  try {
    await newProject.save();
    res.json('Created a new project !')
  } catch (err) {
    res.status(400).send(err);
  }

});

// @route  POST projects/update/tickets-order
// @desc   Update ticket order within the column 
// @access Public 
router.post('/update/tickets-order', (req, res) => {
  const { projectId, newColumn } = req.body;
  Project.findById(projectId)
    .then(project => {
      if (newColumn.newStart !== undefined && newColumn.newFinish !== undefined) {
        const { newStart, newFinish } = newColumn;
        project.columns = {
          ...project.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      } else {
        project.columns = {
          ...project.columns,
          [newColumn.id]: newColumn
        }
      }
      project.save()
        .then(() => res.json('project updated !'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
});

// @route  POST projects/update/column-order
// @desc   Update column order of the project board.
// @access Public 
router.post('/update/column-order', (req, res) => {
  const { projectId, newColumnOrder } = req.body;
  Project.findById(projectId)
    .then(project => {
      project.columnOrder = newColumnOrder
      project.save()
        .then(() => res.json('success'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
});

// @route  POST projects/create-taskids/:projectId
// @desc   Create a new ticket and assign it to a proper location. 
// @access Public 
router.post('/create-taskids/:projectId', verify, async (req, res) => {
  const projectId = req.params.projectId;
  const { ticketId } = req.body;
  try {
    const project = await Project.findById(projectId);
    const firstColumn = project.columnOrder[0];
    project.columns = {
      ...project.columns,
      [firstColumn]: {
        ...project.columns[firstColumn],
        taskIds: [...project.columns[firstColumn].taskIds, ticketId]
      }
    }
    await project.save();
    res.json('Create Ticket !')
  } catch (err) {
    res.status(400).send(err);

  }
});

// @route  POST projects/delete-taskids/:projectId
// @desc   Update the column taskIds array. 
// @access Public 
router.post('/delete-taskids/:projectId', verify, async (req, res) => {
  const projectId = req.params.projectId;
  const { columnId, ticketId } = req.body;
  try {
    const project = await Project.findById(projectId);
    project.columns = {
      ...project.columns,
      [columnId]: {
        ...project.columns[columnId],
        taskIds: project.columns[columnId].taskIds.filter(taskId => taskId !== ticketId)
      }
    }
    await project.save()
    res.json('Delete Ticket !')
  } catch (err) {
    res.status(400).send(err);
  }
});

// @route  POST projects/update-taskids/:projectId
// @desc   Update the column taskIds array. 
// @access Public 
router.post('/update-taskids/:projectId', verify, async (req, res) => {
  const projectId = req.params.projectId;
  const { ticketId, columnMove } = req.body;
  const { beforeColumn, afterColumn } = columnMove;
  try {
    const project = await Project.findById(projectId);
    if (beforeColumn === afterColumn) {
      res.json('Update Ticket !')
      return;
    }
    project.columns = {
      ...project.columns,
      [beforeColumn]: {
        ...project.columns[beforeColumn],
        taskIds: project.columns[beforeColumn].taskIds.filter(taskId => taskId !== ticketId)
      },
      [afterColumn]: {
        ...project.columns[afterColumn],
        taskIds: [...project.columns[afterColumn].taskIds, ticketId]
      },
    }
    await project.save()
    res.json('Update taskids')
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;