import { createSelector } from 'reselect';

const selectMembers = state => state.members;

export const selectAllMembers = createSelector(
  [selectMembers],
  members => members
);
export const selectMembersByProjectId = (projectId) => createSelector(
  [selectMembers],
  members => members[projectId] ? members[projectId] : {}
);