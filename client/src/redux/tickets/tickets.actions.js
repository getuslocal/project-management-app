import api from '../../shared/utils/api';
import {
  GET_TICKETS_BY_PROJECT_ID,
  CREATE_NEW_TICKET,
  DELETE_TICKET,
  UPDATE_TICKET
} from './tickets.types';

export const getTicketsByProjectId = (projectId) => async dispatch => {
  try {
    const res = await api.get(`/tickets/${projectId}`);
    dispatch({
      type: GET_TICKETS_BY_PROJECT_ID,
      payload: res.data
    });
  } catch (err) {
    console.log(err)
  }
};

export const createNewTicket = (formData) => async dispatch => {
  try {
    // Create a new ticket.
    const res = await api.post("/tickets/create", formData);
    const projectId = res.data.projectId;
    const ticketId = res.data._id;
    // Add the new ticket id to a proper project state location.
    await api.post(`/projects/create-taskids/${projectId}`, { ticketId });
    dispatch({
      type: CREATE_NEW_TICKET,
      payload: {
        projectId: projectId,
        data: res.data,
        ticketId
      }
    });
  } catch (err) {
    console.log(err)
  }
};

export const deleteTicket = (ticketId, columnId) => async dispatch => {
  try {
    // Delete a ticket by its id.
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

export const updateTicket = (columnMove, ticketId, formData) => async dispatch => {
  try {
    // Update a ticket by its id.
    const res = await api.post(`/tickets/update/${ticketId}`, formData);
    const projectId = res.data.projectId;
    // Update the ticket column id on db.
    await api.post(`/projects/update-taskids/${projectId}`, { ticketId, columnMove });
    dispatch({
      type: UPDATE_TICKET,
      payload: {
        data: res.data,
        ticketId,
        projectId: projectId,
        columnMove
      }
    });
  } catch (err) {
    console.log(err)
  }
};
