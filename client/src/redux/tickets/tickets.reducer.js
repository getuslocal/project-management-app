import {
  GET_TICKETS_BY_PROJECT_ID,
  CREATE_NEW_TICKET,
  DELETE_TICKET,
  UPDATE_TICKET
} from './tickets.types';

const ticketsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TICKETS_BY_PROJECT_ID:
      return [
        ...payload
      ]
    case CREATE_NEW_TICKET:
      return [
        ...state,
        payload.data
      ]
    case DELETE_TICKET:
      return [
        ...state.filter(ticket => ticket._id !== payload.ticketId)
      ]
    case UPDATE_TICKET: {
      const foundIndex = state.findIndex(ticket => ticket._id === payload.ticketId);
      state[foundIndex] = {
        ...state[foundIndex],
        ...payload.data
      };
      return [
        ...state,
      ]
    }
    default:
      return state;
  }
};

export default ticketsReducer;
