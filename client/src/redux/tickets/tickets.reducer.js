import {
  GET_TICKETS_BY_PROJECT_ID,
  CREATE_NEW_TICKET,
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
    default:
      return state;
  }
};

export default ticketsReducer;
