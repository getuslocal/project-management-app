import { createSelector } from 'reselect';

const selectRoles = state => state.roles;

export const selectRoleComponents = role => createSelector(
  [selectRoles],
  roles => {
    const components = roles.components;
    switch (role) {
      case 'admin':
        return [
          components.dashboard,
          components.projects,
          components.peopleManage,
          components.Inbox,
          components.adminSetting,
        ];
      case 'Project Manager':
        return [
          components.dashboard,
          components.projects,
          components.projectMembers,
          components.Inbox,
        ];
      case 'Developer':
        return [
          components.dashboard,
          components.projects,
          components.Inbox,
        ];
      default:
        break;
    }
  }
);
