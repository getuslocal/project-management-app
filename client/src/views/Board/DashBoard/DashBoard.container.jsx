import React, { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);

  // Handles featching necessary data before rendering DashBoard component.
  useEffect(() => {
    const fetchAllTickets = async () => {
      // Get all tickets of organization.
      await getTicketsOfOrganization(projectIds);
      setIsLoading(false);
    };
    fetchAllTickets();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <DashBoard
      key={props.match.params.dashboard}
      tickets={tickets}
      {...props}
    />
  );
};

DashBoardContainer.propTypes = {
  projectIds: PropTypes.array.isRequired,
  getTicketsOfOrganization: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projectIds: selectProjectsIds,
  tickets: selectTickets,
});

export default connect(mapStateToProps, { getTicketsOfOrganization })(
  DashBoardContainer
);
