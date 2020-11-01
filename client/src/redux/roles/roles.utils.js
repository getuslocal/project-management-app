const rolesList = {
  ADMIN: 'Admin',
  PROJECTMANAGER: 'Project Manager',
  DEVELOPER: 'Developer',
}

const roles = {
  dashboard: {
    id: 1,
    component: 'Dashboard',
    linkUrl: 'dashboard',
    linkVariable: ':dashboard?',
    title: 'Dashboard',
    icon: 'icon-dashboard',
    tabs: [
      {
        label: 'Overview',
        linkUrl: ''
      },
    ],
    dropDownMenu: null
  },
  projects: {
    id: 2,
    component: 'Projects',
    linkUrl: 'projects',
    linkVariable: ':project/:tab?',
    title: 'Projects',
    icon: 'icon-project',
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
    dropDownMenu: null
  },
  projectManagement: {
    id: 3,
    component: 'ProjectManagement',
    linkUrl: 'project-management',
    linkVariable: ':management?',
    title: 'Project Management',
    icon: 'icon-user',
    tabs: [
      {
        label: 'Settings',
        linkUrl: ''
      },
    ]
  },
  adminSetting: {
    id: 6,
    component: 'Setting',
    linkUrl: 'admin-settings',
    linkVariable: '',
    title: 'Admin Settings',
    icon: 'icon-setting',
    tabs: [],
    dropDownMenu: null
  },
};

export const getRolesOfUser = (role) => {
  switch (role) {
    case rolesList.ADMIN:
      return {
        dashboard: roles.dashboard,
        projects: roles.projects,
        projectManagement: roles.projectManagement,
        adminSetting: roles.adminSetting,
      };
    case rolesList.PROJECTMANAGER:
      return {
        dashboard: roles.dashboard,
        projects: roles.projects,
        projectMembers: roles.projectMembers,
      };
    case rolesList.DEVELOPER:
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
    linkUrl: '/' + project._id,
  }))
}