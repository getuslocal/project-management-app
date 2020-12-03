import { combineReducers } from 'redux'

import authReducer from './auth/auth.reducer'
import rolesReducer from './roles/roles.reducer'
import projectsReducer from './projects/projects.reducer'
import ticketsReducer from './tickets/tickets.reducer'
import membersReducer from './members/members.reducer'
import organizationsReducer from './organizations/organizations.reducer'
import alertReducer from './alert/alert.reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  roles: rolesReducer,
  projects: projectsReducer,
  tickets: ticketsReducer,
  members: membersReducer,
  organization: organizationsReducer,
  alert: alertReducer,
})

export default rootReducer
