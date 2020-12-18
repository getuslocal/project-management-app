import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Modal from '../../../../../../shared/components/Modal/Modal'
import Button from '../../../../../../shared/components/Button/Button'
import { Fragment } from 'react'
import DropDownMemu from '../../../../../../shared/components/DropDownMenu/DropDownMenu'
import { roleNames } from '../../../../../../shared/constants/roles'
import { updateUserRole, updateCurrentUserRole } from '../../../../../../redux/auth/auth.actions'
import { Description } from './EditRoleModal.style'
import RolesExplanation from './RolesExplanation/RolesExplanation'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { selectUser } from '../../../../../../redux/auth/auth.selectors'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

const EditRoleModal = ({
  member,
  closeModal,
  currentUser:
  { _id: currentUserId },
  updateUserRole,
  updateCurrentUserRole,
  ...props
}) => {
  const [role, setRole] = useState(member.role);

  const handleSubmit = async () => {

    // If there's no changes, close and return;
    if (role === member.role) {
      closeModal();
      return
    }

    if (member._id === currentUserId) {
      // Update user with a new role.
      await updateCurrentUserRole(member._id, role);
      props.history.push('/app/dashboard');
      // props.history.push('/');
      return
    }

    // Update user with a new role.
    await updateUserRole(member._id, role);
    // Close modal.
    closeModal();
  }

  return (
    <Modal
      title="Edit user role"
      modalWidth={700}
      renderOptions={() => renderOptions(handleSubmit, closeModal)}
    >
      <Description>
        <RolesExplanation />
      </Description>
      <DropDownMemu
        title="Choose role of this member"
        currentItem={() => role}
        onChange={({ value: roleName }) => setRole(roleName)}
        options={getOptions(role)}
        renderValue={({ value: roleName }) => roleName}
      />
    </Modal>
  )
}

const renderOptions = (handleSubmit, closeModal) => (
  <Fragment>
    <Button text="Save" variant="primary" type="submit" onClick={handleSubmit} />
    <Button text="Cancel" variant="secondary" onClick={closeModal} type="button" />
  </Fragment>
);

const getOptions = (currentItem) => (
  Object.values(roleNames).filter(roleName => roleName !== currentItem).map(roleName => ({
    key: roleName,
    value: roleName,
  }))
);

EditRoleModal.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateUserRole: PropTypes.func.isRequired,
  updateCurrentUserRole: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser
})

export default compose(
  withRouter,
  connect(mapStateToProps, { updateUserRole, updateCurrentUserRole })
)(EditRoleModal);
