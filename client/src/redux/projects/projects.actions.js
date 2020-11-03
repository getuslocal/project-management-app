import api from '../../shared/utils/api';
import {
  GET_PROJECTS,
  UPDATE_PROJECT,
  CREATE_PROJECT,
  DELETE_PROJECT,
  UPDATE_ONE_COLUMN_TICKETS_ORDER,
  UPDATE_TWO_COLUMNS_TICKETS_ORDER,
  UPDATE_COLUMN_ORDER,
  FAIL_UPDATE_ORDER,
  SUCCESS_UPDATE_ORDER,
  UPDATE_TICKET_STATUS,
  UPDATE_COLUMN_WITH_NEW_TICKET,
  UPDATE_COLUMN_WITH_DELETED_TICKET,
  SET_CURRENT_PROJECT_ID,
  UPDATE_HISTORY
} from './projects.types';
import { updateRolesWithProjects, updateRolesWithRemovedProject } from '../roles/roles.actions';

// Get projects of the user who is in a certain organization.
export const getProjectsOfUser = (orgId, userId) => async dispatch => {
  try {
    const res = await api.get(`/projects/${orgId}/${userId}`);
    dispatch({
      type: GET_PROJECTS,
      payload: res.data
    });
    // Update roles state with project info.
    dispatch(updateRolesWithProjects(res.data));
  } catch (err) {
    console.log(err)
  }
};

// Create a new project 
export const createNewProject = (formData) => async dispatch => {
  try {
    const res = await api.post("/projects/create", formData);
    console.log(res)
    dispatch({
      type: CREATE_PROJECT,
      payload: res.data
    });
    // Update roles state with project info.
    dispatch(updateRolesWithProjects([res.data]));
  } catch (err) {
    console.log(err)
  }
};

// Update project 
export const updateProject = (projectId, formData) => async dispatch => {
  try {
    const res = await api.post(`/projects/update/${projectId}`, formData);
    dispatch({
      type: UPDATE_PROJECT,
      payload: {
        updatedProject: res.data,
        projectId
      }
    });
  } catch (err) {
    console.log(err)
  }
};

// Create a new project 
export const deleteProject = (pid) => async dispatch => {
  try {
    await api.delete(`/projects/${pid}`);
    dispatch({
      type: DELETE_PROJECT,
      payload: pid
    });
    // Update roles with the removed project.
    dispatch(updateRolesWithRemovedProject(pid));
  } catch (err) {
    console.log(err)
  }
};


// Update ticket history when it is updated/created/deleted.
export const updateHistory = (projectId, logData) => async dispatch => {
  const res = await api.post(`/projects/update/history/${projectId}`, logData);
  // console.log(res)
  dispatch({
    type: UPDATE_HISTORY,
    payload: { projectId, updatedHistory: res.data }
  });
};

// Set project id being accessed.
export const setCurrentProjectId = (projectId) => async dispatch => {
  dispatch({
    type: SET_CURRENT_PROJECT_ID,
    payload: projectId
  });
};

// Update tickets order of one column when it moved within the column.
export const updateOneColumnTicketsOrder = (projectId, newColumn) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_ONE_COLUMN_TICKETS_ORDER,
      payload: { projectId, newColumn }
    });
    await api.post(`/projects/update/tickets_order/${projectId}`, { newColumn });
    dispatch({
      type: SUCCESS_UPDATE_ORDER,
    });
  } catch (err) {
    dispatch({
      type: FAIL_UPDATE_ORDER,
    });
  }
};

// Update tickets order of two columns when it moved from one from another.
export const updateTwoColumnsTicketsOrder = (projectId, newColumn) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_TWO_COLUMNS_TICKETS_ORDER,
      payload: { projectId, newColumn }
    });
    await api.post(`/projects/update/tickets_order/${projectId}`, { newColumn });
    dispatch({
      type: SUCCESS_UPDATE_ORDER,
    });
  } catch (err) {
    dispatch({
      type: FAIL_UPDATE_ORDER,
    });
  }
};

// Update columns order.
export const updateColumnOrder = (projectId, newColumnOrder) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_COLUMN_ORDER,
      payload: { projectId, newColumnOrder }
    });
    await api.post(`/projects/update/column_order/${projectId}`, { newColumnOrder });
    dispatch({
      type: SUCCESS_UPDATE_ORDER,
    });
  } catch (err) {
    dispatch({
      type: FAIL_UPDATE_ORDER,
    });
  }
};

// Update tickets order when issue status of an existng ticket is changed.
export const updateTicketStatus = (columnMove, ticketId, projectId) => async dispatch => {
  // Update the ticket column id on db.
  await api.post(`/projects/update/ticket_status/${projectId}`, { ticketId, columnMove });
  dispatch({
    type: UPDATE_TICKET_STATUS,
    payload: { columnMove, ticketId, projectId }
  });
};

// Update column when a ticket in the column is created.
export const updateColumnWithNewTicket = (projectId, ticketId, columnId) => async dispatch => {
  // Add the new ticket id to a proper project state location.
  console.log(columnId)
  await api.post(`/projects/update/taskids/${projectId}`, { ticketId, columnId });
  dispatch({
    type: UPDATE_COLUMN_WITH_NEW_TICKET,
    payload: { projectId, ticketId, columnId }
  });
};

// Update column when a ticket in the column is deleted.
export const updateColumnWithDeletedTicket = (projectId, ticketId, columnId) => async dispatch => {
  // Delete the ticket in the column.
  await api.post(`/projects/delete/taskids/${projectId}`, { columnId, ticketId });
  dispatch({
    type: UPDATE_COLUMN_WITH_DELETED_TICKET,
    payload: { projectId, ticketId, columnId }
  });
};