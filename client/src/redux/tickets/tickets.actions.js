import api from '../../shared/utils/api';
import {
  GET_TICKETS_BY_PROJECT_ID,
} from './tickets.types';

export const getTicketsByProjectId = (projectId) => async dispatch => {
  try {
    const res = await api.get(`/tickets/${projectId}`);
    dispatch({
      type: GET_TICKETS_BY_PROJECT_ID,
      payload: res.data
    });
  } catch (err) {
    console.log(err)
  }
};
