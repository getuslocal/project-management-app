const INITIAL_STATE = {
  components: {
    dashboard: {
      id:1,
      component: 'Dashboard',
      linkUrl: '',
      title: 'Dashboard',
      icon: 'icon-dashboard',
      hasSubMenu: false
    },
    projects: {
      id:2,
      component: 'Projects',
      linkUrl: '/projects',
      title: 'Projects',
      icon: 'icon-project',
      hasSubMenu: true
    },
    peopleManage: {
      id:3,
      component: 'People',
      linkUrl: '/people-management',
      title: 'People Management',
      icon: 'icon-user',
      hasSubMenu: false
    },
    projectMembers: {
      id:4,
      component: 'People',
      linkUrl: '/project-members',
      title: 'Project Members',
      icon: 'menu',
      hasSubMenu: false
    },
    inbox: {
      id:5,
      component: 'Inbox',
      linkUrl: '/inbox',
      title: 'Inbox',
      icon: 'icon-inbox',
      hasSubMenu: false
    },
    adminSetting: {
      id:6,
      component: 'Setting',
      linkUrl: '/admin-settings',
      title: 'Admin Settings',
      icon: 'icon-setting',
      hasSubMenu: false
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
