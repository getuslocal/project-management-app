import api from '../../shared/utils/api';
import { updateUser } from '../auth/auth.actions';
import { GET_ORGANIZATION, CREATE_ORGANIZATION } from './organizations.types';

export const getOrganization = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/organizations/${id}`);
    dispatch({
      type: GET_ORGANIZATION,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// Create a new organization.
export const createOrganization = (name) => async (dispatch) => {
  try {
    const res = await api.post('/organizations/create', { name: name });
    dispatch({
      type: CREATE_ORGANIZATION,
      payload: res.data,
    });

    const orgId = res.data._id;

    return orgId;
  } catch (err) {
    console.log(err);
  }
};
