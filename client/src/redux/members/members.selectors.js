import { createSelector } from 'reselect';

const members = state => state.members;

export const selectMembers = createSelector(
  [members],
  members => members.members
);

export const selectMemberById = (id) => createSelector(
  [selectMembers],
  members => members.find(member => member._id === id)
);

// Return the only members of the projects
export const selectMembersOfProject = (projectMemberList) => createSelector(
  [selectMembers],
  members => members.filter(member => projectMemberList.includes(member._id))
);
