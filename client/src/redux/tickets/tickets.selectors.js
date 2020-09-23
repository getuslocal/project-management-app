import { createSelector } from 'reselect';

const tickets = state => state.tickets;
const selectFilter = state => state.tickets.filter;

export const selectTickets = createSelector(
  [tickets],
  tickets => tickets.tickets
);

export const selectEpicTickets = createSelector(
  [selectTickets], //@todo: what is dif btw selectTickets and tickets here ? changes a trigger of re-calling this ? 
  tickets => tickets.filter(ticket => ticket.issueType === 'Epic')
);

export const selectTicketsLinkedWithEpic = epicId => createSelector(
  [selectTickets],
  // Return ids of tickets linked with an epic as child issues.
  tickets => tickets.filter(ticket => ticket.linkedEpic === epicId).map(ticket => ticket._id)
);

export const selectEpicById = id => createSelector(
  [selectEpicTickets],
  epics => epics.filter(epic => epic._id === id)[0]
);

export const selectFilters = createSelector(
  [tickets],
  tickets => tickets.filter
);

export const selectUserFilter = createSelector(
  [selectFilter],
  filter => filter.user
);

export const selectSearchFilter = createSelector(
  [selectFilter],
  filter => filter.search
);

export const selectFilteredTickets = createSelector(
  [selectTickets, selectFilters],
  (tickets, filter) => {

    const { user, search } = filter;

    if (user.length > 0) {
      // Check if the ticket assignee is the same as the user in filter state.
      tickets = user.reduce((acc, userId) => {
        acc = [...acc, ...tickets.filter(ticket => ticket.assigneeId === userId)]
        return acc;
      }, []);
    }

    if (search.length > 0) {
      // Check if the value matches any ticket's summary value. (Case insensitive)
      tickets = tickets.filter(ticket => ticket.summary.toLowerCase().includes(search.toLowerCase()))
    }

    // If the filter is empty, just return tickets.
    return tickets
  }
);

export const selectIsTicketsLoaded = createSelector(
  [tickets],
  tickets => tickets.loading
);
