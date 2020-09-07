import {
  UPDATE_WITH_PROJECT_INFO,
  GET_ROLES
} from './roles.types';
import { getProjectLabelAndLinkMap } from './roles.utils';

const rolesReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ROLES:
      return {
        ...state,
        ...payload
      }
    case UPDATE_WITH_PROJECT_INFO:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          tabs: [
            ...state.dashboard.tabs,
            ...getProjectLabelAndLinkMap(payload)
          ]
        },
        projects: {
          ...state.projects,
          dropDownMenu: [...getProjectLabelAndLinkMap(payload)]
        }
      }
    default:
      return state;
  }
};


export default rolesReducer;
