import {
  GET_TICKETS,
  CREATE_NEW_TICKET,
  DELETE_TICKET,
  UPDATE_TICKET,
  ADD_COMMENT,
  DELETE_COMMENT
} from './tickets.types';

const INITIAL_STATE = {
  tickets: [],
  loading: true
}

const ticketsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TICKETS:
      return {
        ...state,
        tickets: payload,
        loading: false
      }
    case CREATE_NEW_TICKET:
      return {
        ...state,
        tickets: [...state.tickets, payload.data]
      }
    case DELETE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter(ticket => ticket._id !== payload.ticketId)
      }
    case UPDATE_TICKET:
      return {
        ...state,
        tickets: state.tickets.map(ticket => {
          if (ticket._id === payload.ticketId) {
            return {
              ...ticket,
              ...payload.data
            }
          }
          return ticket
        })
      }
    case ADD_COMMENT:
      return {
        ...state,
        tickets: state.tickets.map(ticket => {
          if (ticket._id === payload.ticketId) {
            return {
              ...ticket,
              comments: payload.comment
            }
          }
          return ticket
        })
      }
    case DELETE_COMMENT:
      return {
        ...state,
        tickets: state.tickets.map(ticket => {
          if (ticket._id === payload.ticketId) {
            return {
              ...ticket,
              comments: payload.comment
            }
          }
          return ticket
        })
      }
    default:
      return state;
  }
};

export default ticketsReducer;
