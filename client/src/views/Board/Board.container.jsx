import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOrganization } from '../../redux/organizations/organizations.actions';
import { getRoles } from '../../redux/roles/roles.actions';
import Board from './Board';
import PropTypes from 'prop-types';
import Spinner from '../../shared/components/WithSpinner/Spinner';

const BoardContainer = ({ organization, roles, user, getRoles, getOrganization, ...props }) => {
  const isOrgLoaded = !!organization;
  const isRolesLoaded = !!roles;

  // Handles featching necessary data before rendering Board component.
  useEffect(() => {
    // Get roles of the user based on user role.
    getRoles(user.role)
    // Get organization data of the user.
    getOrganization(user.orgId);
  }, []);

  return (
    isOrgLoaded && isRolesLoaded ? (
      <Board
        user={user}
        roles={roles}
        organization={organization}
        {...props}
      />
    ) : (
        <Spinner />
      )
  )
}

BoardContainer.propTypes = {
  organization: PropTypes.object,
  roles: PropTypes.object,
  user: PropTypes.object.isRequired,
  getOrganization: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  organization: state.organization,
  roles: state.roles,
});

export default connect(mapStateToProps, { getRoles, getOrganization })(BoardContainer);