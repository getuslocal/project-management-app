import React, { useState } from 'react';
import PropTypes from 'prop-types';
import store from '../../../../redux/store'
import Description from './Description/Description';
import Owner from './Owner/Owner';
import Category from './Category/Category';
import { updateProject } from '../../../../redux/projects/projects.actions';
import Button from '../../../../shared/components/Button/Button';
import {
  Container,
  CustomInput,
  Title,
  FormCont,
  Icon,
  Image
} from './AboutBoard.style';

const AboutBoard = ({ project }) => {
  const [formValues, setFormValues] = useState({
    name: project.name,
    key: project.key,
    owner: project.owner,
    description: project.description,
    category: project.category,
    projectIconUrl: project.projectIconUrl,
  });
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { name, key, owner, description, category, projectIconUrl } = formValues

  const onChange = event => {
    const { value, name } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formValues)
    setIsEditorOpen(false);
    store.dispatch(updateProject(project._id, formValues))
  }

  return (
    <Container>
      <p>demo3/about</p>
      <Title>Project Details</Title>
      <FormCont>
        <Icon imageUrl={projectIconUrl} >
          <Image src={projectIconUrl} />
          <Button text="Change icon" variant="secondary" />
        </Icon>
        <form onSubmit={handleSubmit}>
          <Description
            currentValue={description}
            isEditorOpen={isEditorOpen}
            setIsEditorOpen={setIsEditorOpen}
            onChange={(text) => setFormValues({ ...formValues, description: text })}
          />
          <CustomInput
            label="Name"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
          <CustomInput
            label="Key"
            type="text"
            name="key"
            width={200}
            value={key}
            onChange={onChange}
            required
          />
          <Owner
            owner={owner}
            onChange={(value) => setFormValues({ ...formValues, owner: value })}
          />
          <Category
            currentCategory={category}
            onChange={(value) => setFormValues({ ...formValues, category: value })}
          />
          <Button type="submit" text="Save changes" variant="primary" />
        </form>
      </FormCont>
    </Container>
  )
}


export default AboutBoard;