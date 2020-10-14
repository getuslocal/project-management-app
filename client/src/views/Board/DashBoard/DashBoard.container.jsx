import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import DashBoard from './DashBoard';
import PropTypes from 'prop-types';
import { getTicketsOfOrganization } from '../../../redux/tickets/tickets.actions';
import { getMembersOfOrganization } from '../../../redux/members/members.actions';
import { selectProjectsIds } from '../../../redux/projects/projects.selectors';
import { selectOrganization } from '../../../redux/organizations/organizations.selectors';
import { createStructuredSelector } from 'reselect';
import { selectTickets } from '../../../redux/tickets/tickets.selectors';
import Spinner from '../../../shared/components/WithSpinner/Spinner';

const DashBoardContainer = ({
  projectIds,
  organization,
  tickets,
  getTicketsOfOrganization,
  getMembersOfOrganization,
  ...props
}) => {

  // Handles featching necessary data before rendering DashBoard component.
  useEffect(() => {
    // Get all tickets of organization.
    getTicketsOfOrganization(projectIds);
    // Get all members of organization.
    getMembersOfOrganization(organization._id)
  }, []);
  return (
    tickets.length > 0 ? (
      <DashBoard tickets={tickets} {...props} />
    ) : (
        <Spinner />
      )
  )
}

DashBoardContainer.propTypes = {
  projectIds: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
  getTicketsOfOrganization: PropTypes.func.isRequired,
  getMembersOfOrganization: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projectIds: selectProjectsIds,
  tickets: selectTickets,
  organization: selectOrganization
});

export default connect(mapStateToProps, { getTicketsOfOrganization, getMembersOfOrganization })(DashBoardContainer);