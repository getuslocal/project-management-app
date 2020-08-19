import {
  GET_PROJECTS,
} from './projects.types';

const INITIAL_STATE = {
  projects: null,
  tickets: null
};

const projectsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: payload
      }
    default:
      return state;
  }
};

export default projectsReducer;
