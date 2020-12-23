import api from '../../shared/utils/api';
import {
  GET_ORG_MEMBERS,
  UPDATE_MEMBER,
  GET_PROJECT_MEMBERS
} from './members.types';

// Get project members.
export const getProjectMembers = (projectMembersList) => dispatch => {
  dispatch({
    type: GET_PROJECT_MEMBERS,
    payload: projectMembersList
  });
};

// Get all the members of the organization.
export const getOrganizationMembers = (orgId) => async dispatch => {
  try {
    const res = await api.get(`/users/org/${orgId}`);
    dispatch({
      type: GET_ORG_MEMBERS,
      payload: res.data
    });
  } catch (err) {
    console.log(err)
  }
};

// Update member
export const updateMember = (memberId, updatedData) => dispatch => {
  dispatch({
    type: UPDATE_MEMBER,
    payload: { memberId, updatedData }
  });
};
