import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon/Icon';
import {
  Container,
  Input,
} from './SearchBox.style';

const SearchBox = ({ onChange, value, width, ...props }) => {
  return (
    <Container width={width} >
      <Input width={width} value={value} onChange={onChange} {...props} />
      <Icon type="search" size={12} isSolid={true} />
    </Container>
  )
}

SearchBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  width: PropTypes.number.isRequired,
}

export default SearchBox
