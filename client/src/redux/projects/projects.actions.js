import api from '../../shared/utils/api';
import {
  GET_PROJECTS,
  UPDATE_ONE_COLUMN_TICKETS_ORDER,
  UPDATE_TWO_COLUMNS_TICKETS_ORDER,
  UPDATE_COLUMN_ORDER,
  FAIL_UPDATE_ORDER,
  SUCCESS_UPDATE_ORDER,
  UPDATE_TICKET_STATUS,
  UPDATE_COLUMN_WITH_NEW_TICKET
} from './projects.types';
import { updateWithProjectInfo } from '../roles/roles.actions';

export const getProjectsOfOwner = (ownerId) => async dispatch => {
  try {
    const res = await api.get(`/projects/${ownerId}`);
    dispatch({
      type: GET_PROJECTS,
      payload: res.data
    });
    // Update roles state with project info.
    dispatch(updateWithProjectInfo(res.data));
  } catch (err) {
    console.log(err)
  }
};

export const updateOneColumnTicketsOrder = (projectId, newColumn) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_ONE_COLUMN_TICKETS_ORDER,
      payload: { projectId, newColumn }
    });
    await api.post("/projects/update/tickets-order", { projectId, newColumn });
    dispatch({
      type: SUCCESS_UPDATE_ORDER,
    });
  } catch (err) {
    dispatch({
      type: FAIL_UPDATE_ORDER,
    });
  }
};

export const updateTwoColumnsTicketsOrder = (projectId, newColumn) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_TWO_COLUMNS_TICKETS_ORDER,
      payload: { projectId, newColumn }
    });
    await api.post("/projects/update/tickets-order", { projectId, newColumn });
    dispatch({
      type: SUCCESS_UPDATE_ORDER,
    });
  } catch (err) {
    dispatch({
      type: FAIL_UPDATE_ORDER,
    });
  }
};

export const updateColumnOrder = (projectId, newColumnOrder) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_COLUMN_ORDER,
      payload: { projectId, newColumnOrder }
    });
    await api.post("/projects/update/column-order", { projectId, newColumnOrder });
    dispatch({
      type: SUCCESS_UPDATE_ORDER,
    });
  } catch (err) {
    dispatch({
      type: FAIL_UPDATE_ORDER,
    });
  }
};

// This is called when user edit an existng ticekt and changed issue status.
export const updateTicketStatus = (columnMove, ticketId, projectId) => async dispatch => {
  // Update the ticket column id on db.
  await api.post(`/projects/update-taskids/${projectId}`, { ticketId, columnMove });
  dispatch({
    type: UPDATE_TICKET_STATUS,
    payload: { columnMove, ticketId, projectId }
  });
};

// @todo: Configure this to update when ticket is deleted. @9/23
export const updateColumnWithNewTicket = (projectId, ticketId, columnId) => async dispatch => {
  // Add the new ticket id to a proper project state location.
  await api.post(`/projects/create-taskids/${projectId}`, { ticketId, columnId });
  dispatch({
    type: UPDATE_COLUMN_WITH_NEW_TICKET,
    payload: { projectId, ticketId, columnId }
  });
};

// This is called when user edit an existng ticekt and changed issue status.
export const updateColumnWithDeletedTicket = (projectId, ticketId, columnId) => async dispatch => {
  // Add the new ticket id to a proper project state location.
  await api.post(`/projects/create-taskids/${projectId}`, { ticketId, columnId });
  dispatch({
    type: UPDATE_COLUMN_WITH_NEW_TICKET,
    payload: { projectId, ticketId, columnId }
  });
};