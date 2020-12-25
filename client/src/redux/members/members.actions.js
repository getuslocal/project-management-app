import api from '../../shared/utils/api';
import { GET_ORG_MEMBERS, UPDATE_MEMBER } from './members.types';

// Get all the members of the organization.
export const getOrganizationMembers = (orgId) => async (dispatch) => {
  try {
    const res = await api.get(`/users/org/${orgId}`);
    dispatch({
      type: GET_ORG_MEMBERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// Update member
export const updateMember = (memberId, updatedData) => (dispatch) => {
  dispatch({
    type: UPDATE_MEMBER,
    payload: { memberId, updatedData },
  });
};
