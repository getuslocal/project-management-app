import api from '../../shared/utils/api';
import {
  GET_TICKETS,
  CREATE_NEW_TICKET,
  DELETE_TICKET,
  UPDATE_TICKET,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  FILTER_TICKETS_BY_USERID,
  REMOVE_USER_FILTER,
  FILTER_TICKETS_BY_SEARCH,
  CLEAR_ALL_FILTERS
} from './tickets.types';
import { updateTicketColumn } from '../projects/projects.actions';

// Get tickets of the project.
export const getTicketsByProjectId = (projectId) => async dispatch => {
  try {
    const res = await api.get(`/tickets/${projectId}`);
    dispatch({
      type: GET_TICKETS,
      payload: res.data
    });
  } catch (err) {
    console.log(err)
  }
};

// Create a new ticket.
export const createNewTicket = (formData, columnId = null) => async dispatch => {
  try {
    const res = await api.post("/tickets/create", formData);
    const projectId = res.data.projectId;
    const ticketId = res.data._id;
    // Add the new ticket id to a proper project state location.
    await api.post(`/projects/create-taskids/${projectId}`, { ticketId, columnId });
    dispatch({
      type: CREATE_NEW_TICKET,
      payload: {
        projectId: projectId,
        data: res.data,
        ticketId,
        columnId
      }
    });
  } catch (err) {
    console.log(err)
  }
};

// Create a new epic ticket.
export const createNewEpicTicket = (formData, columnId = null) => async dispatch => {
  try {
    const res = await api.post("/tickets/create/epic", formData);
    const projectId = res.data.projectId;
    const ticketId = res.data._id;
    // Add the new ticket id to a proper project state location.
    await api.post(`/projects/create-taskids/${projectId}`, { ticketId, columnId });
    dispatch({
      type: CREATE_NEW_TICKET,
      payload: {
        projectId: projectId,
        data: res.data,
        ticketId,
        columnId
      }
    });
  } catch (err) {
    console.log(err)
  }
};

// Delete a ticket by its id.
export const deleteTicket = (ticketId, columnId) => async dispatch => {
  try {
    const res = await api.delete(`/tickets/${ticketId}`);
    const projectId = res.data.projectId;
    // Delete the ticket inside the column of the project board.
    await api.post(`/projects/delete-taskids/${projectId}`, { columnId, ticketId });
    dispatch({
      type: DELETE_TICKET,
      payload: {
        projectId,
        columnId,
        ticketId,
      }
    });
  } catch (err) {
    console.log(err)
  }
};

// Update a ticket by its id.
export const updateTicket = (columnMove, ticketId, formData) => async dispatch => {
  try {
    const res = await api.post(`/tickets/update/${ticketId}`, formData);
    const projectId = res.data.projectId;
    // Update the ticket column id on db.
    await api.post(`/projects/update-taskids/${projectId}`, { ticketId, columnMove });
    dispatch({
      type: UPDATE_TICKET,
      payload: {
        data: res.data,
        ticketId,
      }
    });

    // Update ticket column if changed on project state.
    dispatch(updateTicketColumn(columnMove, ticketId, projectId));
  } catch (err) {
    console.log(err)
  }
};

// Update a epic ticket by its id.
export const updateEpicTicket = (ticketId, formData) => async dispatch => {
  try {
    const res = await api.post(`/tickets/update/epic/${ticketId}`, formData);
    dispatch({
      type: UPDATE_TICKET,
      payload: {
        data: res.data,
        ticketId,
      }
    });
  } catch (err) {
    console.log(err)
  }
};

// Comment on a ticket.
export const addComment = (ticketId, formData) => async dispatch => {
  try {
    const res = await api.post(`/tickets/comment/${ticketId}`, formData);
    dispatch({
      type: ADD_COMMENT,
      payload: {
        comment: res.data,
        ticketId: ticketId
      }
    });
  } catch (err) {
    console.log(err)
  }
};

// Delete comment
export const deleteComment = (ticketId, commentId) => async dispatch => {
  try {
    const res = await api.delete(`/tickets/comment/${ticketId}/${commentId}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: {
        comment: res.data,
        ticketId: ticketId
      }
    });
  } catch (err) {
    console.log(err)
  }
};

// Filter Tickets by user.
export const filterTicketsByUser = (userId) => async dispatch => {
  dispatch({
    type: FILTER_TICKETS_BY_USERID,
    payload: userId
  })
};

// Filter Tickets by search input.
export const filterTicketsBySearch = (value) => async dispatch => {
  dispatch({
    type: FILTER_TICKETS_BY_SEARCH,
    payload: value
  })
};

// Remove a user id from the user filter array.
export const removeUserFilter = (userId) => async dispatch => {
  dispatch({
    type: REMOVE_USER_FILTER,
    payload: userId
  })
};

// Clear all filters.
export const clearAllFilters = () => async dispatch => {
  dispatch({
    type: CLEAR_ALL_FILTERS,
  })
};

