import { createSelector } from 'reselect';

const selectAuth = state => state.auth;

export const selectAuthInfo = createSelector(
  [selectAuth],
  auth => auth
);
export const selectUser = createSelector(
  [selectAuth],
  auth => auth.user
);
