import {
  UPDATE_WITH_PROJECT_INFO,
  UPDATE_WITH_REMOVED_PROJECT,
  GET_ROLES
} from './roles.types';
import { getProjectLabelAndLinkMap } from './roles.utils';

const rolesReducer = (state = null, action) => {
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
          dropDownMenu: [
            ...state.projects.dropDownMenu,
            ...getProjectLabelAndLinkMap(payload)
          ]
        }
      }
    case UPDATE_WITH_REMOVED_PROJECT:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          tabs: state.dashboard.tabs.filter(tab => tab.projectId !== payload)
        },
        projects: {
          ...state.projects,
          dropDownMenu: state.projects.dropDownMenu.filter(menu => menu.projectId !== payload)
        }
      }
    default:
      return state;
  }
};


export default rolesReducer;
