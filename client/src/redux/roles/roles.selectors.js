import { createSelector } from 'reselect';

const selectRoles = state => state.roles;

export const selectRoleComponents = role => createSelector(
  [selectRoles],
  roles => {
    const components = roles.components;
    switch (role) {
      case 'Admin':
        return [
          components.dashboard,
          components.projects,
          components.peopleManage,
          components.inbox,
          components.adminSetting,
        ];
      case 'Project Manager':
        return [
          components.dashboard,
          components.projects,
          components.projectMembers,
          components.inbox,
        ];
      case 'Developer':
        return [
          components.dashboard,
          components.projects,
          components.inbox,
        ];
      default:
        break;
    }
  }
);
