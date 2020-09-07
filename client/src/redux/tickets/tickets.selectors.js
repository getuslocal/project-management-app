import { createSelector } from 'reselect';

export const tickets = state => state.tickets;

export const selectTickets = createSelector(
  [tickets],
  tickets => tickets.tickets
);

export const selectIsTicketsLoaded = createSelector(
  [tickets],
  tickets => tickets.loading
);
