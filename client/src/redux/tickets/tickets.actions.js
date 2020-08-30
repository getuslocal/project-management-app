import api from '../../shared/utils/api';
import {
  GET_TICKETS_BY_PROJECT_ID,
  CREATE_NEW_TICKET,
  DELETE_TICKET
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

export const createNewTicket = (currentProjectId, formData) => async dispatch => {
  try {
    // Create a new ticket.
    const res = await api.post("/tickets/create", formData);
    // Add the new ticket id to a proper project state location.
    await api.post("/projects/create/ticket", { projectId: currentProjectId, newTicketId: res.data._id });
    dispatch({
      type: CREATE_NEW_TICKET,
      payload: {
        projectId: currentProjectId,
        data: res.data,
        id: res.data._id
      }
    });
  } catch (err) {
    console.log(err)
  }
};

export const deleteTicket = (ticketId, columnId, projectId) => async dispatch => {
  try {
    // Delete a ticket by its id.
    await api.delete(`/tickets/${ticketId}`);
    // Delete the ticket inside the column of the project board.
    await api.post("/projects/delete/ticket", { projectId, columnId, ticketId });
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
