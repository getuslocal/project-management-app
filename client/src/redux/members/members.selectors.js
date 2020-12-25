import { createSelector } from 'reselect';

const members = (state) => state.members;

export const selectMembers = createSelector(
  [members],
  (members) => members.members
);

export const selectProjectMembers = (projectMembersList) =>
  createSelector([selectMembers], (members) =>
    members.filter((member) => projectMembersList.includes(member._id))
  );

export const selectMemberById = (id) =>
  createSelector([selectMembers], (members) =>
    members.find((member) => member._id === id)
  );
