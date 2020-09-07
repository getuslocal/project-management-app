import { getRolesOfUser } from './roles.utils';
import {
  GET_ROLES,
  UPDATE_WITH_PROJECT_INFO
} from './roles.types';

export const getRoles = (role) => dispatch => {
  const roles = getRolesOfUser(role)
  dispatch({
    type: GET_ROLES,
    payload: roles
  });
};

export const updateWithProjectInfo = (data) => {
  return {
      type: UPDATE_WITH_PROJECT_INFO,
      payload: data
  }
}
