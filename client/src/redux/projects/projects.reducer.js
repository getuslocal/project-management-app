import {
  GET_PROJECTS,
  UPDATE_ONE_COLUMN_TICKETS_ORDER,
  UPDATE_TWO_COLUMNS_TICKETS_ORDER,
  UPDATE_COLUMN_ORDER,
  DELETE_TICKET,
  UPDATE_TICKET_STATUS,
  UPDATE_COLUMN_WITH_NEW_TICKET,
  UPDATE_COLUMN_WITH_DELETED_TICKET,
} from './projects.types';
import { convertArrayToObject } from '../../shared/utils/functions';


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
    case UPDATE_COLUMN_WITH_NEW_TICKET: {
      const { projectId, ticketId, columnId } = payload
      const project = state[projectId];
      return {
        ...state,
        [projectId]: {
          ...project,
          columns: {
            ...project.columns,
            [columnId]: {
              ...project.columns[columnId],
              taskIds: [...project.columns[columnId].taskIds, ticketId]
            }
          }
        }
      }
    }
    case UPDATE_COLUMN_WITH_DELETED_TICKET: {
      const { projectId, columnId, ticketId } = payload;
      const project = state[projectId];
      return {
        ...state,
        [projectId]: {
          ...project,
          columns: {
            ...project.columns,
            [columnId]: {
              ...project.columns[columnId],
              taskIds: project.columns[columnId].taskIds.filter(taskId => taskId !== ticketId)
            }
          }
        }
      }
    }
    case UPDATE_TICKET_STATUS: {
      const { projectId, columnMove, ticketId } = payload;
      const project = state[projectId];
      const { beforeColumn, afterColumn } = columnMove;
      // If there's no change in the ticket status, just return the current state.
      if (beforeColumn === afterColumn) {
        return state
      }
      return {
        ...state,
        [projectId]: {
          ...project,
          columns: {
            ...project.columns,
            [beforeColumn]: {
              ...project.columns[beforeColumn],
              taskIds: project.columns[beforeColumn].taskIds.filter(taskId => taskId !== ticketId)
            },
            [afterColumn]: {
              ...project.columns[afterColumn],
              taskIds: [...project.columns[afterColumn].taskIds, ticketId]
            },
          }
        }
      }
    }
    default:
      return state;
  }
};

export default projectsReducer;
