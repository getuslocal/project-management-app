import api from '../../shared/utils/api';
import {
  GET_MEMBERS,
} from './members.types';

export const getMembersOfProject = (members) => async dispatch => {
  let membersList = [];
  try {
    for (const memberId of members) {
      const res = await api.get(`/users/${memberId}`);
      const memberData = res.data;
      membersList = [...membersList, memberData]
    };
    dispatch({
      type: GET_MEMBERS,
      payload: membersList
    });
  } catch (err) {
    console.log(err)
  }
};

export const getMembersOfOrganization = (orgId) => async dispatch => {
  try {
    const res = await api.get(`/users/org/${orgId}`);
    dispatch({
      type: GET_MEMBERS,
      payload: res.data
    });
  } catch (err) {
    console.log(err)
  }
};
