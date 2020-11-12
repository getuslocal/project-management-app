import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import DashBoard from './DashBoard';
import PropTypes from 'prop-types';
import { getTicketsOfOrganization } from '../../../redux/tickets/tickets.actions';
import { selectProjectsIds } from '../../../redux/projects/projects.selectors';
import { createStructuredSelector } from 'reselect';
import { selectTickets } from '../../../redux/tickets/tickets.selectors';
import Spinner from '../../../shared/components/WithSpinner/Spinner';

const DashBoardContainer = ({
  projectIds,
  tickets,
  getTicketsOfOrganization,
  ...props
}) => {

  // Handles featching necessary data before rendering DashBoard component.
  useEffect(() => {
    // Get all tickets of organization.
    getTicketsOfOrganization(projectIds);
    // console.log('dashboard useeffectc called')
  }, []);

  return (
    tickets.length > 0 ? (
      <DashBoard key={props.match.params.dashboard} tickets={tickets} {...props} />
    ) : (
        <Spinner />
      )
  )
}

DashBoardContainer.propTypes = {
  projectIds: PropTypes.array.isRequired,
  getTicketsOfOrganization: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projectIds: selectProjectsIds,
  tickets: selectTickets,
});

export default connect(mapStateToProps, { getTicketsOfOrganization })(DashBoardContainer);