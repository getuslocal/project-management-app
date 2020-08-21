import { createSelector } from 'reselect';

const selectProjects = state => state.projects;

export const selectProjectById = id => createSelector(
  [selectProjects],
  projects => {
    // console.log(projects)
    return (
      projects ? projects.filter(project => project._id === id)[0] : {}
    )
  }
);