import { createSelector } from 'reselect';

const roles = (state) => state.roles;

// Return roles sorted by weight.
// This is for safari bug, version 13.1.3., so may be removed later.
export const selectRoles = createSelector([roles], (roles) => {
  const rolesList = Object.values(roles);
  let formattedRoles = {};

  // Sort roles list by weight.
  rolesList.sort((a, b) => {
    if (a.weight < b.weight) return -1;
    if (a.weight > b.weight) return 1;
    return 0;
  });

  // Convert sorted roles list to object.
  rolesList.forEach((role) => {
    formattedRoles = {
      ...formattedRoles,
      [role.id]: {
        ...role,
      },
    };
  });

  return formattedRoles;
});
