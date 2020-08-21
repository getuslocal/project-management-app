import { createSelector } from 'reselect';

const selectTickets = state => state.tickets;

export const selectTicketsOfUser = createSelector(
  [selectTickets],
  tickets => tickets
);