const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Project = require('../models/project.model');
const User = require('../models/user.model');
const verify = require('../middleware/auth');

// @route  GET projects/:org_id/:user_id
// @desc   Get projects of the user who is in a certain organization.
// @access Private 
router.get('/:org_id/:user_id', verify, (req, res) => {
  Project.find({ orgId: req.params.org_id, members: req.params.user_id })
    .then(project => res.json(project))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route  POST projects/login
// @desc   Create a new project. 
// @access Private 
router.post('/create', verify, async (req, res) => {
  const { key, owner, name, members } = req.body;

  const defaultColumns = {
    'column-1': {
      id: 'column-1',
      title: 'TO DO',
      taskIds: [],
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
    projectIconUrl: '',
    history: [],
  });

  try {
    await newProject.save();
    res.json('Created a new project !')
  } catch (err) {
    res.status(400).send(err);
  }

});

// @route  POST projects/update/tickets_order/:project_id
// @desc   Update ticket order within the column 
// @access Private 
router.post('/update/:id', verify, async (req, res) => {
  const projectId = req.params.id;
  const { key, owner, name, projectIconUrl, description, category } = req.body;

  const updatedValue = {
    key: key,
    owner: owner,
    name: name,
    projectIconUrl: projectIconUrl,
    description: description,
    category: category,
  };

  try {
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId },
      { $set: updatedValue },
      { new: true, runValidator: true }
    );
    res.json(updatedProject)
  } catch (err) {
    res.status(400).send(err);
  }
});

// @route  POST projects/update/tickets_order/:project_id
// @desc   Update ticket order within the column 
// @access Private 
router.post('/update/history/:id', verify, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    const post = await Project.findById(req.params.id);
    const { ticketId, type, field, before, after } = req.body;

    const newHistory = {
      ticketId: ticketId,
      type: type,
      editor: user._id,
      field: field,
      before: before,
      after: after,
    };

    // If the history length is equal or greater than 30,
    // remove the last history item.
    if (post.history.length >= 50) {
      post.history.pop()
    }

    post.history.unshift(newHistory);

    await post.save();

    res.json(post.history);
  } catch (err) {
    res.status(400).send(err);
  }
});

// @route  POST projects/update/column_order/:project_id
// @desc   Update column order of the project board.
// @access Private 
router.post('/update/column_order/:project_id', verify, (req, res) => {
  const projectId = req.params.project_id;
  const { newColumnOrder } = req.body;
  Project.findById(projectId)
    .then(project => {
      project.columnOrder = newColumnOrder
      project.save()
        .then(() => res.json('success'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
});

// @route  POST projects/update/tickets_order/:project_id
// @desc   Update ticket order within the column or between two columns. 
// @access Private 
router.post('/update/tickets_order/:project_id', verify, (req, res) => {
  const projectId = req.params.project_id;
  const { newColumn } = req.body;
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

// @route  POST projects/update/tickets_status/:project_id
// @desc   Update tickets order when issue status of an existng ticket is changed.
// @access Private 
router.post('/update/ticket_status/:project_id', verify, async (req, res) => {
  const projectId = req.params.project_id;
  const { ticketId, columnMove } = req.body;
  const { beforeColumn, afterColumn } = columnMove;
  try {
    const project = await Project.findById(projectId);
    if (beforeColumn === afterColumn) {
      res.json('Update Ticket')
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

// @route  POST projects/update/taskids/:project_id
// @desc   Create a new ticket and assign it to a proper location. 
// @access Private 
router.post('/update/taskids/:project_id', verify, async (req, res) => {
  const projectId = req.params.project_id;
  const { ticketId, columnId } = req.body;
  try {
    const project = await Project.findById(projectId);
    // If the column is not specified, then assign the ticket to the first column.
    const targetColumn = columnId ? columnId : project.columnOrder[0];
    project.columns = {
      ...project.columns,
      [targetColumn]: {
        ...project.columns[targetColumn],
        taskIds: [...project.columns[targetColumn].taskIds, ticketId]
      }
    }
    await project.save();
    res.json('Create Ticket !')
  } catch (err) {
    res.status(400).send(err);

  }
});

// @route  POST projects/delete/taskids/:project_id
// @desc   Update the column taskIds array. 
// @access Private 
router.post('/delete/taskids/:project_id', verify, async (req, res) => {
  const projectId = req.params.project_id;
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


module.exports = router;