import { createSelector } from 'reselect';

export const organization = state => state.organization;

export const selectOrganization = createSelector(
  [organization],
  organization => organization
);