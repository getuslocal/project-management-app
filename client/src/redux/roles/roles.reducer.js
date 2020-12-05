import {
  UPDATE_WITH_PROJECT_INFO,
  UPDATE_WITH_UPDATED_PROJECT_INFO,
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
    case UPDATE_WITH_UPDATED_PROJECT_INFO:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          tabs: state.dashboard.tabs.map(tab => {
            if (tab.projectId === payload.projectId) {
              return getProjectLabelAndLinkMap(payload.updatedProject)[0]
            }
            return tab
          })
        },
        projects: {
          ...state.projects,
          dropDownMenu: state.projects.dropDownMenu.map(menu => {
            if (menu.projectId === payload.projectId) {
              return getProjectLabelAndLinkMap(payload.updatedProject)[0]
            }
            return menu
          })
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
