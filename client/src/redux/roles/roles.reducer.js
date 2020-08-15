const INITIAL_STATE = {
  components: {
    dashboard: {
      id: 1,
      component: 'Dashboard',
      linkUrl: '',
      title: 'Dashboard',
      icon: 'icon-dashboard',
      hasSubMenu: null
    },
    projects: {
      id: 2,
      component: 'Projects',
      linkUrl: '/projects',
      title: 'Projects',
      icon: 'icon-project',
      hasSubMenu: [
        {
          label: 'Demo 1',
          linkUrl: 'demo1'
        },
        {
          label: 'Demo 2',
          linkUrl: 'demo2'
        },
      ]
    },
    peopleManage: {
      id: 3,
      component: 'People',
      linkUrl: '/people-management',
      title: 'People Management',
      icon: 'icon-user',
      hasSubMenu: null
    },
    projectMembers: {
      id: 4,
      component: 'People',
      linkUrl: '/project-members',
      title: 'Project Members',
      icon: 'icon-user',
      hasSubMenu: null
    },
    inbox: {
      id: 5,
      component: 'Inbox',
      linkUrl: '/inbox',
      title: 'Inbox',
      icon: 'icon-inbox',
      hasSubMenu: null
    },
    adminSetting: {
      id: 6,
      component: 'Setting',
      linkUrl: '/admin-settings',
      title: 'Admin Settings',
      icon: 'icon-setting',
      hasSubMenu: null
    },
  }
};

const rolesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default rolesReducer;
