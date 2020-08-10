import { combineReducers } from 'redux'

import authReducer from './auth/auth.reducer';
import rolesReducer from './roles/roles.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  roles: rolesReducer,
})

export default rootReducer;
