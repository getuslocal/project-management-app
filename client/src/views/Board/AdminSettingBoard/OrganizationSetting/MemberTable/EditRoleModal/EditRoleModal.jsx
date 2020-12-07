import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Modal from '../../../../../../shared/components/Modal/Modal'
import Button from '../../../../../../shared/components/Button/Button'
import { Fragment } from 'react'
import DropDownMemu from '../../../../../../shared/components/DropDownMenu/DropDownMenu'
import { roleNames } from '../../../../../../shared/constants/roles'
import { updateUser } from '../../../../../../redux/auth/auth.actions'
import store from '../../../../../../redux/store'
import { Description } from './EditRoleModal.style'
import RolesExplanation from './RolesExplanation/RolesExplanation'

const EditRoleModal = ({ member, closeModal }) => {
  const [role, setRole] = useState(member.role);

  const handleSubmit = () => {
    // Update user with a new role.
    // store.dispatch(updateUser(member._id, { role: role }));
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
        currentItem={role}
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

}

export default EditRoleModal
