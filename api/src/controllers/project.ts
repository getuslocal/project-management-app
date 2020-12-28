import { NextFunction, Request, Response } from 'express';
import { IHistory } from '../interfaces/project';
import Project from '../models/project';

// Get project by organization id.
const getProjectByOrgId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await Project.find({ orgId: req.params.org_id });
    res.json(project);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

// Create a project.
const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      key,
      name,
      orgId,
      description,
      category,
      projectIconUrl,
    } = req.body;

    // Get current user id.
    const { _id: uid } = res.locals.user;

    // Create a new project
    const newProject = new Project({
      key: key,
      name: name,
      orgId: orgId,
      description: description,
      category: category,
      projectIconUrl: projectIconUrl,
      members: [String(uid)],
    });
    const savedProject = await newProject.save();
    res.json(savedProject);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Update a project.
const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectId = req.params.id;
    const updatedValues = req.body;
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId },
      { $set: updatedValues },
      { new: true, runValidators: true }
    );
    res.json(updatedProject);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete a project.
const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    res.json(project);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Update ticket order within the column.
const updateProjectHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id: uid } = res.locals.user;
    const project = await Project.findById(req.params.id);
    const { ticket, type, field, before, after } = req.body;
    const newHistory: IHistory = {
      ticket: ticket,
      type: type,
      editor: uid,
      field: field,
      before: before,
      after: after,
      date: Date.now(),
    };

    if (!project) return res.status(400).send('Project not found.');

    // If the history length is equal or greater than 30,
    // remove the last history item.
    if (project.history.length >= 30) {
      project.history.pop();
    }

    project.history.unshift(newHistory);

    await project.save();

    res.json(project.history);
  } catch (err) {
    res.status(400).send(err);
  }
};
// Update column order of the project board.
const updateProjectColumnOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newColumnOrder } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(400).send('Project not found.');

    project.columnOrder = newColumnOrder;
    project.save();
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

// Update ticket order within the column or between two columns.
const updateProjectIssuesOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newColumn } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(400).send('Project not found.');

    if (newColumn.newStart !== undefined && newColumn.newFinish !== undefined) {
      const { newStart, newFinish } = newColumn;
      project.columns = {
        ...project.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      };
    } else {
      project.columns = {
        ...project.columns,
        [newColumn.id]: newColumn,
      };
    }
    await project.save();
    res.json('Update issues order');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

//Update tickets order when issue status of an existng ticket is changed.
const updateProjectIssueStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ticketId, columnMove } = req.body;
    const { beforeColumn, afterColumn } = columnMove;
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(400).send('Project not found.');

    if (beforeColumn === afterColumn) {
      res.json('Update Ticket');
      return;
    }

    project.columns = {
      ...project.columns,
      [beforeColumn]: {
        ...project.columns[beforeColumn],
        taskIds: project.columns[beforeColumn].taskIds.filter(
          (taskId) => taskId !== ticketId
        ),
      },
      [afterColumn]: {
        ...project.columns[afterColumn],
        taskIds: [...project.columns[afterColumn].taskIds, ticketId],
      },
    };

    await project.save();
    res.json('Update taskids');
  } catch (err) {
    res.status(400).send(err);
  }
};

// Create a new ticket and assign it to a proper location.
const updateProjectTaskIds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ticketId, columnId } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(400).send('Project not found.');

    // If the column is not specified, then assign the ticket to the first column.
    const targetColumn = columnId ? columnId : project.columnOrder[0];
    project.columns = {
      ...project.columns,
      [targetColumn]: {
        ...project.columns[targetColumn],
        taskIds: [...project.columns[targetColumn].taskIds, ticketId],
      },
    };
    await project.save();
    res.json('Create Ticket !');
  } catch (err) {
    res.status(400).send(err);
  }
};

// Update the column taskIds array.
const deleteProjectTaskIds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { columnId, ticketId } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(400).send('Project not found.');

    project.columns = {
      ...project.columns,
      [columnId]: {
        ...project.columns[columnId],
        taskIds: project.columns[columnId].taskIds.filter(
          (taskId) => taskId != ticketId
        ),
      },
    };
    await project.save();
    res.json('Delete Ticket !');
  } catch (err) {
    res.status(400).send(err);
  }
};

export default {
  getProjectByOrgId,
  createProject,
  updateProject,
  deleteProject,
  updateProjectHistory,
  updateProjectColumnOrder,
  updateProjectIssuesOrder,
  updateProjectIssueStatus,
  updateProjectTaskIds,
  deleteProjectTaskIds,
};
