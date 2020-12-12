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
import { IssueTypes } from '../../../shared/constants/issues';

const SearchResults = ({ search, projects, isSearchActive, ticketsList, setIsSearchActive, ...props }) => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
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
        projects[ticket.projectId].key.toLowerCase().includes(formattedSearch)) ||
      projects[ticket.projectId].name.toLowerCase().includes(formattedSearch))
  }

  return (
    isSearchActive &&
    Object.keys(projects).length > 0 &&
    search.length > 0 && (
      <Container>
        <ul>
          {
            tickets.length === 0 ? (
              <List><p>{isLoading ? 'loading...' : 'No tickets found.'}</p></List>
            ) : (
                filterTickets(tickets, search).map(ticket => (
                  <List key={ticket._id} onClick={(e) => {
                    // Prevent parent onClick firing.
                    e.stopPropagation();
                    setIsSearchActive(false);
                    const isEpic = (ticket.issueType === IssueTypes.EPIC);

                    if (isEpic) {
                      props.history.push(`/app/projects/${ticket.projectId}/roadmap?selectedIssue=${ticket.key}`);
                    } else {
                      props.history.push(`/app/projects/${ticket.projectId}?selectedIssue=${ticket.key}`);
                    }
                  }}>
                    <Icon type={ticket.issueType.toLowerCase()} size={18} />
                    <div>
                      <Summary><span>{projects[ticket.projectId].key}-{ticket.key}</span>{ticket.summary}</Summary>
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