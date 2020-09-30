import api from '../../shared/utils/api';
import {
  GET_MEMBERS_BY_PROJECTID,
} from './members.types';

export const getMembersByProjectId = (members) => async dispatch => {
  try {
    let membersList = [];
    for (const memberId of members) {
      const res = await api.get(`/users/${memberId}`);
      const memberData = res.data;
      membersList = [ ...membersList, memberData ]
    };
    dispatch({
      type: GET_MEMBERS_BY_PROJECTID,
      payload: membersList
    });
  } catch (err) {
    console.log(err)
  }
};
