import {
  GET_PROJECTS,
} from './projects.types';

const projectsReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROJECTS:
      return [
        ...payload
      ]
    default:
      return state;
  }
};

export default projectsReducer;
