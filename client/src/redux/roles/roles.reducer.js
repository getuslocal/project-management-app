import {
  GET_PROJECTS
} from './roles.types';

const INITIAL_STATE = {
  dashboard: {
    id: 1,
    component: 'Dashboard',
    linkUrl: 'dashboard',
    linkVariable: ':dashboard?',
    title: 'Dashboard',
    icon: 'icon-dashboard',
    hasSubMenu: null,
    tabs: [
      {
        label: 'All projects',
        linkUrl: ''
      },
    ]
  },
  projects: {
    id: 2,
    component: 'Projects',
    linkUrl: 'projects',
    linkVariable: ':project/:tab?',
    title: 'Project',
    icon: 'icon-project',
    hasSubMenu: null,
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
        label: 'Settings',
        linkUrl: '/settings'
      },
    ]
  },
  peopleManage: {
    id: 3,
    component: 'People',
    linkUrl: 'people-management',
    linkVariable: '',
    title: 'People Management',
    icon: 'icon-user',
    hasSubMenu: null,
    tabs: []
  },
  projectMembers: {
    id: 4,
    component: 'People',
    linkUrl: 'project-members',
    linkVariable: '',
    title: 'Project Members',
    icon: 'icon-user',
    hasSubMenu: null,
    tabs: []
  },
  inbox: {
    id: 5,
    component: 'Inbox',
    linkUrl: 'inbox',
    linkVariable: '',
    title: 'Inbox',
    icon: 'icon-inbox',
    hasSubMenu: null,
    tabs: []
  },
  adminSetting: {
    id: 6,
    component: 'Setting',
    linkUrl: 'admin-settings',
    linkVariable: '',
    title: 'Admin Settings',
    icon: 'icon-setting',
    hasSubMenu: null,
    tabs: []
  },
};

const rolesReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROJECTS:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          tabs: [
            ...state.dashboard.tabs,
            ...getProjectNames(payload)
          ]
        },
        projects: {
          ...state.projects,
          hasSubMenu: [...getProjectNames(payload)]
        }
      }
    default:
      return state;
  }
};

// @todo: place this on util file.
function getProjectNames(projects) {
  return projects.map(project => ({
    label: project.name,
    linkUrl: '/' + project._id,
  }))
}

export default rolesReducer;
