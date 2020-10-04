import {
  GET_ORGANIZATION,
} from './organizations.types';

const organizationReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ORGANIZATION:
      return {
        ...state,
        ...payload
      }
    default:
      return state;
  }
};

export default organizationReducer;
