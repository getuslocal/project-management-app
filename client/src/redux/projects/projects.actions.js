import api from '../../shared/utils/api';
import {
  GET_PROJECTS,
} from './projects.types';

export const getProjectsOfOwner = (ownerId) => async dispatch => {
  try {
    const res = await api.get(`/projects/${ownerId}`);
    dispatch({
      type: GET_PROJECTS,
      payload: res.data
    });
  } catch (err) {
    console.log(err)
  }
};
