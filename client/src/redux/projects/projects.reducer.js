import {
  GET_PROJECTS,
  UPDATE_ONE_COLUMN_TICKETS_ORDER,
  UPDATE_TWO_COLUMNS_TICKETS_ORDER,
  UPDATE_COLUMN_ORDER,
} from './projects.types';
import { convertArrayToObject } from './projects.utils';


const projectsReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROJECTS:
      return {
        ...state,
        ...convertArrayToObject(payload, '_id')
      }
    case UPDATE_ONE_COLUMN_TICKETS_ORDER:
      return {
        ...state,
        [payload.projectId]: {
          ...state[payload.projectId],
          columns: {
            ...state[payload.projectId].columns,
            [payload.newColumn.id]: payload.newColumn
          }
        }
      }
    case UPDATE_TWO_COLUMNS_TICKETS_ORDER:
      const { newStart, newFinish } = payload.newColumn;
      return {
        ...state,
        [payload.projectId]: {
          ...state[payload.projectId],
          columns: {
            ...state[payload.projectId].columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
          }
        }
      }
    case UPDATE_COLUMN_ORDER:
      return {
        ...state,
        [payload.projectId]: {
          ...state[payload.projectId],
          columnOrder: payload.newColumnOrder
        }
      }
    default:
      return state;
  }
};

export default projectsReducer;
