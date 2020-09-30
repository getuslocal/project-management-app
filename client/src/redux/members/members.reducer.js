import {
  GET_MEMBERS_BY_PROJECTID,
} from './members.types';

const INITIAL_STATE = {
  members: [],
  loading: true
}

const membersReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MEMBERS_BY_PROJECTID:
      return {
        ...state,
        members : payload,
        loading : false
      }
    default:
      return state;
  }
};

export default membersReducer;
