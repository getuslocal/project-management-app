import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import SelectMenu from '../../../../../shared/components/SelectMenu/SelectMenu';
import Icon from '../../../../../shared/components/Icon/Icon';
import {
  Button,
  SelectItem
} from './SelectButton.style';

const SelectButton = ({ projectId, ...props }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const options = [
    { key: 'project', value: 'Edit project', data: projectId },
    { key: 'member', value: 'Manage members' },
  ];

  // Open modal based on the chosen option with a query string.
  const openModal = (option) => {
    const stringified = queryString.stringify({ type: option.key, projectId: projectId })
    props.history.push(`${props.match.url}?${stringified}`)
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
        onChange={(option) => openModal(option)}
        options={options}
        width={170}
        renderValue={({ value }) => <SelectItem>{value}</SelectItem>}
      />
    </Fragment>
  )
}

SelectButton.propTypes = {

}

export default withRouter(SelectButton)
