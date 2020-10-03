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
        label: 'All projects',
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
        label: 'Members',
        linkUrl: '/members'
      },
      {
        label: 'About',
        linkUrl: '/about'
      },
    ],
    dropDownMenu: null
  },
  peopleManage: {
    id: 3,
    component: 'People',
    linkUrl: 'people-management',
    linkVariable: '',
    title: 'People Management',
    icon: 'icon-user',
    tabs: []
  },
  projectMembers: {
    id: 4,
    component: 'People',
    linkUrl: 'project-members',
    linkVariable: '',
    title: 'Project Members',
    icon: 'icon-user',
    tabs: [],
    dropDownMenu: null
  },
  inbox: {
    id: 5,
    component: 'Inbox',
    linkUrl: 'inbox',
    linkVariable: '',
    title: 'Inbox',
    icon: 'icon-inbox',
    tabs: []
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
        peopleManage: roles.peopleManage,
        inbox: roles.inbox,
        adminSetting: roles.adminSetting,
      };
    case rolesList.PROJECTMANAGER:
      return {
        dashboard: roles.dashboard,
        projects: roles.projects,
        projectMembers: roles.projectMembers,
        inbox: roles.inbox,
      };
    case rolesList.DEVELOPER:
      return {
        dashboard: roles.dashboard,
        projects: roles.projects,
        inbox: roles.inbox,
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