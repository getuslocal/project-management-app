import { getRolesOfUser } from './roles.utils';
import {
  GET_ROLES,
  UPDATE_ROLES,
  UPDATE_WITH_PROJECT_INFO,
  UPDATE_WITH_UPDATED_PROJECT_INFO,
  UPDATE_WITH_REMOVED_PROJECT
} from './roles.types';

export const getRoles = (role) => dispatch => {
  const roles = getRolesOfUser(role)
  dispatch({
    type: GET_ROLES,
    payload: roles
  });
};

// Update dashboard tabs and project drop down menus with project's data.
export const updateRolesWithProjects = (data) => {
  return {
    type: UPDATE_WITH_PROJECT_INFO,
    payload: data
  }
}

// Update dashboard tabs and project drop down menus with updated project's data.
export const updateRolesWithUpdatedProject = (projectId, updatedProject) => {
  return {
    type: UPDATE_WITH_UPDATED_PROJECT_INFO,
    payload: { projectId, updatedProject }
  }
}

// Update dashboard tabs and project drop down menus with a removed project.
export const updateRolesWithRemovedProject = (projectId) => {
  return {
    type: UPDATE_WITH_REMOVED_PROJECT,
    payload: projectId
  }
}

export const updateRolesWithNewRole = (newRole) => dispatch => {
  dispatch({
    type: UPDATE_ROLES,
    payload: newRole
  });
};