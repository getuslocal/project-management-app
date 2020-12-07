import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import FormModal from '../../../shared/components/Modal/FormModal/FormModal';
import {
  UserIcon,
} from './EditProfileModal.style';
import Icon from '../../../shared/components/Icon/Icon';
import Button from '../../../shared/components/Button/Button';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectUser } from '../../../redux/auth/auth.selectors';
import Input from '../../../shared/components/Form/Input/Input';
import ImageFileUpload from '../../../shared/components/Form/ImageFileUpload/ImageFileUpload';
import { updateUser } from '../../../redux/auth/auth.actions';

const EditProfileModal = ({ closeModal, currentUser, updateUser }) => {

  const [formValues, setFormValues] = useState({
    name: currentUser.name,
    email: currentUser.email,
    position: currentUser.position,
    pictureUrl: currentUser.pictureUrl,
  });

  const { name, email, position, pictureUrl } = formValues

  const onChange = event => {
    const { value, name } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user profile.
    updateUser(currentUser._id, formValues);
    closeModal();
  }

  return (
    <FormModal
      title="Edit profile"
      modalWidth={500}
      renderOptions={() => renderOptions(closeModal)}
      handleSubmit={handleSubmit}
    >
      <UserIcon>
        <Icon type="user-icon" imageUrl={pictureUrl} size={100} />
        <ImageFileUpload
          id="profile_image"
          text="Change profile photo"
          accept="image/png,image/jpeg"
          name="profile_image"
          description="* File format: png or jpeg."
          onChange={fileUrl => setFormValues({ ...formValues, pictureUrl: fileUrl })}
        />
      </UserIcon>
      <Input
        label="Name*"
        type="text"
        name="name"
        height={36}
        maxLength={30}
        value={name}
        onChange={onChange}
        required
      />
      <Input
        label="Email*"
        type="text"
        name="email"
        height={36}
        maxLength={40}
        value={email}
        onChange={onChange}
        required
      />
      <Input
        label="Position*"
        type="text"
        name="position"
        height={36}
        maxLength={40}
        value={position}
        onChange={onChange}
        required
      />
    </FormModal>
  )
}

const renderOptions = (closeModal) => (
  <Fragment>
    <Button text="Save changes" variant="primary" type="submit" />
    <Button text="Cancel" variant="secondary" type="button" onClick={closeModal} />
  </Fragment>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser
})

export default connect(mapStateToProps, { updateUser })(EditProfileModal)
