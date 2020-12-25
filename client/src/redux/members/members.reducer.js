import { GET_ORG_MEMBERS, UPDATE_MEMBER } from './members.types';

const INITIAL_STATE = {
  members: [],
  loading: true,
};

const membersReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ORG_MEMBERS:
      return {
        ...state,
        members: payload,
        loading: false,
      };
    case UPDATE_MEMBER:
      return {
        ...state,
        members: state.members.map((member) => {
          if (member._id === payload.memberId) {
            return {
              ...payload.updatedData,
            };
          }
          return member;
        }),
      };
    default:
      return state;
  }
};

export default membersReducer;
