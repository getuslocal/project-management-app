import { combineReducers } from 'redux'

import authReducer from './auth/auth.reducer';
import rolesReducer from './roles/roles.reducer';
import projectsReducer from './projects/projects.reducer';
import ticketsReducer from './tickets/tickets.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  roles: rolesReducer,
  projects : projectsReducer,
  tickets : ticketsReducer,
})

export default rootReducer;
