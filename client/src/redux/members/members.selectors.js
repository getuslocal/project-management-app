import { createSelector } from 'reselect';

const members = state => state.members;

export const selectMembers = createSelector(
  [members],
  members => members
);
export const selectMembersByProjectId = (projectId) => createSelector(
  [selectMembers],
  members => members[projectId] ? members[projectId] : {}
);