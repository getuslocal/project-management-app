import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import SelectMenu from '../../../../../shared/components/SelectMenu/SelectMenu';
import store from '../../../../../redux/store'
import { deleteProject } from '../../../../../redux/projects/projects.actions';
import Icon from '../../../../../shared/components/Icon/Icon';
import {
  Button,
  SelectItem
} from './SelectButton.style';

const SelectButton = ({ projectId, ...props }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const options = [
    { key: 'project', value: 'Edit project', queryString: true },
    { key: 'member', value: 'Manage members', queryString: true },
    { key: 'delete', value: 'Delete Project', queryString: false },
  ];

  // Open modal based on the chosen option with a query string.
  const onChange = (option) => {
    if (option.queryString) {
      const stringified = queryString.stringify({ type: option.key, projectId: projectId })
      props.history.push(`${props.match.url}?${stringified}`)
    } else if (option.key === 'delete') {
      store.dispatch(deleteProject(projectId))
    }
  }

  return (
    <Fragment>
      <Button onClick={() => setIsMenuOpen(true)} >
        Action
        <Icon type="sort-down" size={10} isSolid={true} top={1} />
      </Button>
      <SelectMenu
        isActive={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onChange={(option) => onChange(option)}
        options={options}
        width={170}
        renderValue={(option) => renderValue(option, projectId)}
      />
    </Fragment>
  )
}

const renderValue = (option,) => (
  <SelectItem className={option.key === 'delete' && 'delete'}>
    {option.key === 'delete' && <Icon type="warning" size={11} isSolid={true} top={-1} />}
    {option.value}
  </SelectItem>
);

SelectButton.propTypes = {
  projectId: PropTypes.string.isRequired,
}

export default withRouter(SelectButton)
