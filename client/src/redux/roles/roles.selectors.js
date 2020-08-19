import { createSelector } from 'reselect';

const selectRoles = state => state.roles;

export const selectRoleComponents = role => createSelector(
  [selectRoles],
  roles => {
    // const components = roles.components;
    switch (role) {
      case 'Admin':
        return [
          roles.dashboard,
          roles.projects,
          roles.peopleManage,
          roles.inbox,
          roles.adminSetting,
        ];
      case 'Project Manager':
        return [
          roles.dashboard,
          roles.projects,
          roles.projectMembers,
          roles.inbox,
        ];
      case 'Developer':
        return [
          roles.dashboard,
          roles.projects,
          roles.inbox,
        ];
      default:
        break;
    }
  }
);
