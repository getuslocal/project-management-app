import { createSelector } from 'reselect';

const projects = state => state.projects;

export const selectProjects = createSelector(
  [projects],
  projects => projects.projects
);

export const selectProjectsIds = createSelector(
  [selectProjects],
  projects => Object.values(projects).map(project => project._id)
);

export const selectProjectsLoaded = createSelector(
  [projects],
  // projects => (!projects.loading && Object.keys(projects.projects).length === 0 ? false : projects.loading)
  projects => !projects.loading
);

export const selectCurrentProjectId = createSelector(
  [projects],
  projects => projects.currentProjectId
);

export const selectCurrentProject = createSelector(
  [selectProjects, selectCurrentProjectId],
  (projects, pid) => (pid !== null ? projects[pid] : {})
);

export const selectProjectById = id => createSelector(
  [selectProjects],
  projects => Object.keys(projects).includes(id) ? projects[id] : null
);

export const selectProjectHistory = id => createSelector(
  [selectProjects],
  projects => {
    if (id) return projects[id].history;
    const histories = Object.values(projects).reduce((acc, project) => {
      acc = [...acc, ...project.history]
      return acc;
    }, []);
    return histories
  }
);

