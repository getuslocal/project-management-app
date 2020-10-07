import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import DashBoard from './DashBoard';
import PropTypes from 'prop-types';
import { getTicketsOfOrganization } from '../../../redux/tickets/tickets.actions';
import { getMembersOfOrganization } from '../../../redux/members/members.actions';
import { selectProjectsIds } from '../../../redux/projects/projects.selectors';
import { selectOrganization } from '../../../redux/organizations/organizations.selectors';
import { createStructuredSelector } from 'reselect';

const DashBoardContainer = ({
  projectIds,
  organization,
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
  return <DashBoard {...props} />
}

DashBoardContainer.propTypes = {
  projectIds: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
  getTicketsOfOrganization: PropTypes.func.isRequired,
  getMembersOfOrganization: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projectIds: selectProjectsIds,
  organization: selectOrganization
});

export default connect(mapStateToProps, { getTicketsOfOrganization, getMembersOfOrganization })(DashBoardContainer);