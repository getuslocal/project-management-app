import {
  GET_TICKETS_BY_PROJECT_ID,
} from './tickets.types';

const ticketsReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TICKETS_BY_PROJECT_ID:
      return [
        ...payload
      ]
    default:
      return state;
  }
};

export default ticketsReducer;
