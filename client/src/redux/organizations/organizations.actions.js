import api from '../../shared/utils/api';
import {
  GET_ORGANIZATION,
} from './organizations.types';

export const getOrganization = (id) => async dispatch => {
  try {
    const res = await api.get(`/organizations/${id}`);
    dispatch({
      type: GET_ORGANIZATION,
      payload: res.data
    });
  } catch (err) {
    console.log(err)
  }
};
