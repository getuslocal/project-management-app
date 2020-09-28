import { createSelector } from 'reselect';

const projects = state => state.projects;

export const selectProjects = createSelector(
  [projects],
  projects => projects.projects
);

export const selectIsProjectsLoaded = createSelector(
  [projects],
  projects => projects.loading
);

export const selectCurrentProjectId = createSelector(
  [projects],
  projects => projects.currentProjectId
);

export const selectProjectById = id => createSelector(
  [selectProjects],
  projects => projects[id]
);
