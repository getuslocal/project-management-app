import api from '../../shared/utils/api';
import {
  GET_MEMBERS_BY_PROJECTID,
} from './members.types';

export const getMembersByProjectId = (members, projectId) => async dispatch => {
  try {
    let membersList = {};
    for (const memberId of members) {
      const memberInfo = await api.get(`/users/${memberId}`);
      const memberData = memberInfo.data;
      membersList = { ...membersList, [memberData._id]: memberData }
    };
    dispatch({
      type: GET_MEMBERS_BY_PROJECTID,
      payload: { [projectId]: membersList }
    });
  } catch (err) {
    console.log(err)
  }
};
