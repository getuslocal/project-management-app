import { createSelector } from 'reselect';

const selectProjects = state => state.projects;

export const selectProjectById = id => createSelector(
  [selectProjects],
  projects => {
    return (
      Object.keys(projects).length ? projects[id] : {}
    )
  }
);