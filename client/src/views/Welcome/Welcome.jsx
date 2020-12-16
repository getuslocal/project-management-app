import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom';
import Input from '../../shared/components/Form/Input/Input';
import {
  Container,
  FormContainer,
  DemoContent,
  MenuOption
} from './Welcome.style';
import Button from '../../shared/components/Button/Button';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/auth/auth.selectors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import DropDownMemu from '../../shared/components/DropDownMenu/DropDownMenu';
import { roleNames, descriptiveRoleNames } from '../../shared/constants/roles';
import { createOrganization } from '../../redux/organizations/organizations.actions';
import { updateUser } from '../../redux/auth/auth.actions';
import { generateDemoData } from '../../shared/utils/demo/demo';
import Spinner from '../../shared/components/WithSpinner/Spinner';

const WelcomePage = ({
  userCredentials,
  createOrganization,
  updateUser,
  ...props
}) => {
  const [isLoading, setIsloading] = useState(false);
  const [formValues, setFormValues] = useState({
    organization: '',
    position: '',
    role: roleNames.ADMIN
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);

    // Create organization.
    const newOrgId = await createOrganization(formValues.organization);

    const userUpdateData = {
      orgId: newOrgId,
      position: formValues.position,
      role: formValues.role,
    }

    // Update users with new fields.
    await updateUser(userCredentials._id, userUpdateData);

    // Generate demo data.
    await generateDemoData(userCredentials._id, newOrgId);
    setIsloading(false);
  }

  if (userCredentials.orgId && userCredentials.role) {
    return (
      isLoading ? (
        <Spinner loadingText="Generating your demo data, please wait..." filled={true} />
      ) : (
          <Redirect to="/app/dashboard" />
        )
    )
  }

  return (
    <Container>
      <FormContainer>
        <h1>Welcome {userCredentials.name} !</h1>
        <h2>Let's create your organization.</h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Organization *"
            value={formValues.organization}
            onChange={e => setFormValues({ ...formValues, organization: e.target.value })}
            placeholder="Enter your organization name"
            description="Please enter your organization name."
            style={{ height: '40px' }}
            maxLength={50}
          />
          <Input
            label="Position *"
            value={formValues.position}
            onChange={e => setFormValues({ ...formValues, position: e.target.value })}
            placeholder="Enter your position"
            description="Please enter your position name to be displayed on your account."
            style={{ height: '40px' }}
            maxLength={50}
          />
          <DemoContent>
            <h3>Demo Setting</h3>
            <DropDownMemu
              title="Choose a role you want to play with (can change anytime later)"
              currentItem={formValues.role}
              onChange={option => setFormValues({ ...formValues, role: option.key })}
              options={Object.values(descriptiveRoleNames).filter(role => role.id !== formValues.role).map(role => ({
                key: role.id,
                value: role.description
              }))}
              renderValue={(option) => (
                <MenuOption>{option.key} <span>(Have access to : <em>{option.value}</em>)</span></MenuOption>
              )}
              description="* Recommended to start with Admin as it has access to all the functionarities."
            />
          </DemoContent>
          <Button text="Get started" variant="primary" type="submit" />
        </form>
      </FormContainer>
    </Container>
  )
}

WelcomePage.propTypes = {

}

const mapStateToProps = createStructuredSelector({
  userCredentials: selectUser
});

export default compose(
  withRouter,
  connect(mapStateToProps, { createOrganization, updateUser })
)(WelcomePage);