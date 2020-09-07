import { createSelector } from 'reselect';

const selectRoles = state => state.roles;

export const selectRolesList = createSelector(
  [selectRoles],
  roles =>  Object.entries(roles).map(([key, value]) => value) // Convert object to array.
);