import api from '../../shared/utils/api';
import {
  GET_PROJECTS,
  UPDATE_ONE_COLUMN_TICKETS_ORDER,
  UPDATE_TWO_COLUMNS_TICKETS_ORDER,
  UPDATE_COLUMN_ORDER,
  FAIL_UPDATE_ORDER,
  SUCCESS_UPDATE_ORDER
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

export const updateOneColumnTicketsOrder = (projectId, newColumn) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_ONE_COLUMN_TICKETS_ORDER,
      payload: { projectId, newColumn }
    });
    await api.post("/projects/update/tickets-order", { projectId, newColumn });
    dispatch({
      type: SUCCESS_UPDATE_ORDER,
    });
  } catch (err) {
    dispatch({
      type: FAIL_UPDATE_ORDER,
    });
  }
};

export const updateTwoColumnsTicketsOrder = (projectId, newColumn) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_TWO_COLUMNS_TICKETS_ORDER,
      payload: { projectId, newColumn }
    });
    await api.post("/projects/update/tickets-order", { projectId, newColumn });
    dispatch({
      type: SUCCESS_UPDATE_ORDER,
    });
  } catch (err) {
    dispatch({
      type: FAIL_UPDATE_ORDER,
    });
  }
};

export const updateColumnOrder = (projectId, newColumnOrder) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_COLUMN_ORDER,
      payload: { projectId, newColumnOrder }
    });
    await api.post("/projects/update/column-order", { projectId, newColumnOrder });
    dispatch({
      type: SUCCESS_UPDATE_ORDER,
    });
  } catch (err) {
    dispatch({
      type: FAIL_UPDATE_ORDER,
    });
  }
};