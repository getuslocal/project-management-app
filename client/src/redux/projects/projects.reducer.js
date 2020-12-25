import {
  GET_PROJECTS,
  UPDATE_PROJECT,
  CREATE_PROJECT,
  UPDATE_HISTORY,
  SET_CURRENT_PROJECT_ID,
  UPDATE_ONE_COLUMN_TICKETS_ORDER,
  UPDATE_TWO_COLUMNS_TICKETS_ORDER,
  UPDATE_COLUMN_ORDER,
  DELETE_PROJECT,
  UPDATE_TICKET_STATUS,
  UPDATE_COLUMN_WITH_NEW_TICKET,
  UPDATE_COLUMN_WITH_DELETED_TICKET,
} from './projects.types';
import { convertArrayToObject } from '../../shared/utils/functions';

const INITIAL_STATE = {
  projects: {},
  currentProjectId: null,
  loading: true,
};

const projectsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: convertArrayToObject(payload, '_id'),
        loading: false,
      };
    case CREATE_PROJECT:
      return {
        ...state,
        projects: {
          ...state.projects,
          [payload._id]: payload,
        },
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        projects: {
          ...state.projects,
          [payload.projectId]: payload.updatedProject,
        },
      };
    case DELETE_PROJECT: {
      const { [payload]: removed, ...restProjects } = state.projects;
      return {
        ...state,
        projects: restProjects ? restProjects : {},
      };
    }
    case UPDATE_HISTORY:
      return {
        ...state,
        projects: {
          ...state.projects,
          [payload.projectId]: {
            ...state.projects[payload.projectId],
            history: payload.updatedHistory,
          },
        },
      };
    case SET_CURRENT_PROJECT_ID:
      return {
        ...state,
        currentProjectId: payload,
      };
    case UPDATE_ONE_COLUMN_TICKETS_ORDER:
      return {
        ...state,
        projects: {
          ...state.projects,
          [payload.projectId]: {
            ...state.projects[payload.projectId],
            columns: {
              ...state.projects[payload.projectId].columns,
              [payload.newColumn.id]: payload.newColumn,
            },
          },
        },
      };
    case UPDATE_TWO_COLUMNS_TICKETS_ORDER:
      const { newStart, newFinish } = payload.newColumn;
      return {
        ...state,
        projects: {
          ...state.projects,
          [payload.projectId]: {
            ...state.projects[payload.projectId],
            columns: {
              ...state.projects[payload.projectId].columns,
              [newStart.id]: newStart,
              [newFinish.id]: newFinish,
            },
          },
        },
      };
    case UPDATE_COLUMN_ORDER:
      return {
        ...state,
        projects: {
          ...state.projects,
          [payload.projectId]: {
            ...state.projects[payload.projectId],
            columnOrder: payload.newColumnOrder,
          },
        },
      };
    case UPDATE_COLUMN_WITH_NEW_TICKET: {
      const { projectId, ticketId, columnId } = payload;
      const project = state.projects[projectId];
      return {
        ...state,
        projects: {
          ...state.projects,
          [projectId]: {
            ...project,
            columns: {
              ...project.columns,
              [columnId]: {
                ...project.columns[columnId],
                taskIds: [...project.columns[columnId].taskIds, ticketId],
              },
            },
          },
        },
      };
    }
    case UPDATE_COLUMN_WITH_DELETED_TICKET: {
      const { projectId, columnId, ticketId } = payload;
      const project = state.projects[projectId];
      return {
        ...state,
        projects: {
          ...state.projects,
          [projectId]: {
            ...project,
            columns: {
              ...project.columns,
              [columnId]: {
                ...project.columns[columnId],
                taskIds: project.columns[columnId].taskIds.filter(
                  (taskId) => taskId !== ticketId
                ),
              },
            },
          },
        },
      };
    }
    case UPDATE_TICKET_STATUS: {
      const { projectId, columnMove, ticketId } = payload;
      const project = state.projects[projectId];
      const { beforeColumn, afterColumn } = columnMove;
      // If there's no change in the ticket status, just return the current state.
      if (beforeColumn === afterColumn) {
        return state;
      }
      return {
        ...state,
        projects: {
          ...state.projects,
          [projectId]: {
            ...project,
            columns: {
              ...project.columns,
              [beforeColumn]: {
                ...project.columns[beforeColumn],
                taskIds: project.columns[beforeColumn].taskIds.filter(
                  (taskId) => taskId !== ticketId
                ),
              },
              [afterColumn]: {
                ...project.columns[afterColumn],
                taskIds: [...project.columns[afterColumn].taskIds, ticketId],
              },
            },
          },
        },
      };
    }
    default:
      return state;
  }
};

export default projectsReducer;
