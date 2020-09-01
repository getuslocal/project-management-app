import {
  GET_MEMBERS_BY_PROJECTID,
} from './members.types';


const membersReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MEMBERS_BY_PROJECTID:
      return {
        ...state,
        ...payload
      }
    default:
      return state;
  }
};

export default membersReducer;
