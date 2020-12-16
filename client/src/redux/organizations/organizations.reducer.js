import {
  GET_ORGANIZATION,
  CREATE_ORGANIZATION
} from './organizations.types';

const organizationReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ORGANIZATION:
      return {
        ...payload
      }
    case CREATE_ORGANIZATION:
      return {
        ...payload
      }
    default:
      return state;
  }
};

export default organizationReducer;
