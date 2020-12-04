import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { selectTickets } from '../../../redux/tickets/tickets.selectors';
import { selectProjects } from '../../../redux/projects/projects.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Icon from '../../../shared/components/Icon/Icon';
import {
  Container,
  List,
  Summary,
  ProjectName,
} from './SearchResults.style'
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import api from '../../../shared/utils/api';

const SearchResults = ({ search, projects, isSearchActive, ticketsList, ...props }) => {
  const [tickets, setTickets] = useState([]);

  // @TODO: Figure out this way vs fetching all the tickets at a higher level.
  useEffect(() => {
    const fetchAllTickets = async () => {
      const projectIds = Object.values(projects).map(project => project._id);
      let ticketsList = [];
      try {
        for (const projectId of projectIds) {
          const res = await api.get(`/tickets/${projectId}`);
          ticketsList = [...ticketsList, ...res.data]
        };
        setTickets(ticketsList);
      } catch (err) {
        console.log(err)
      }
    };
    fetchAllTickets();
  }, [ticketsList]);

  // Filter tickets by summary, key, or project name.
  const filterTickets = (tickets, search) => {
    const formattedSearch = search.toLowerCase();
    return tickets.filter(ticket =>
      (ticket.summary.toLowerCase().includes(formattedSearch) ||
        ticket.key.toLowerCase().includes(formattedSearch)) ||
      projects[ticket.projectId].name.toLowerCase().includes(formattedSearch))
  }

  return (
    isSearchActive &&
    search.length > 0 && (
      <Container>
        <ul>
          {
            !tickets.length > 0 ? (
              <List><p>loading...</p></List>
            ) : (
                filterTickets(tickets, search).map(ticket => (
                  <List key={ticket._id} onClick={() => props.history.push(`/app/projects/${ticket.projectId}?selectedIssue=${ticket.key}`)}>
                    <Icon type={ticket.issueType.toLowerCase()} size={18} />
                    <div>
                      <Summary><span>{ticket.key}</span>{ticket.summary}</Summary>
                      <ProjectName>{projects[ticket.projectId].name}</ProjectName>
                    </div>
                  </List>
                ))
              )
          }
        </ul>
      </Container>
    )
  )
}

SearchResults.propTypes = {
  ticketsList: PropTypes.array.isRequired,
  projects: PropTypes.object.isRequired,
  search: PropTypes.string.isRequired,
}

const mapStateToProps = createStructuredSelector({
  ticketsList: selectTickets,
  projects: selectProjects,
});

export default compose(withRouter, connect(mapStateToProps, null))(SearchResults);