import {roleNames} from '../../shared/constants/roles';

const roles = {
  dashboard: {
    id: 'dashboard',
    component: 'Dashboard',
    linkUrl: 'dashboard',
    linkVariable: ':dashboard?',
    title: 'Dashboard',
    icon: 'dashboard',
    tabs: [
      {
        label: 'Overview',
        linkUrl: ''
      },
    ],
    dropDownMenu: []
  },
  projects: {
    id: 'projects',
    component: 'Projects',
    linkUrl: 'projects',
    linkVariable: ':project/:tab?',
    title: 'Projects',
    icon: 'project',
    tabs: [
      {
        label: 'Board',
        linkUrl: ''
      },
      {
        label: 'Roadmap',
        linkUrl: '/roadmap'
      },
      {
        label: 'Calendar',
        linkUrl: '/calendar'
      },
    ],
    dropDownMenu: []
  },
  projectManagement: {
    id: 'project-management',
    component: 'ProjectManagement',
    linkUrl: 'project-management',
    linkVariable: ':management?',
    title: 'Project Management',
    icon: 'user-cog',
    tabs: [
      {
        label: 'Settings',
        linkUrl: ''
      },
    ],
    dropDownMenu: []
  },
  adminSetting: {
    id: 'admin-settings',
    component: 'AdminSetting',
    linkUrl: 'admin-settings',
    linkVariable: '',
    title: 'Admin Settings',
    icon: 'setting',
    tabs: [
      {
        label: 'Organization',
        linkUrl: ''
      },
    ],
    dropDownMenu: []
  },
};

export const getRolesOfUser = (role) => {
  switch (role) {
    case roleNames.ADMIN:
      return {
        dashboard: roles.dashboard,
        projects: roles.projects,
        projectManagement: roles.projectManagement,
        adminSetting: roles.adminSetting,
      };
    case roleNames.PROJECTMANAGER:
      return {
        dashboard: roles.dashboard,
        projects: roles.projects,
        projectMembers: roles.projectMembers,
      };
    case roleNames.MEMBER:
      return {
        dashboard: roles.dashboard,
        projects: roles.projects,
      };
    default:
      break;
  }
}

export const getProjectLabelAndLinkMap = (projects) => {
  return projects.map(project => ({
    label: project.name,
    linkUrl: `/${project._id}`,
    projectId: project._id
  }))
}