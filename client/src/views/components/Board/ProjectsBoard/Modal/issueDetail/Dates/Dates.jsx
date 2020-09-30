import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Container
} from './Dates.style';

const Dates = ({ createAt, updatedAt }) => (
  <Container>
    <p>Created : {moment(new Date(createAt)).format('lll')}</p>
    <p>Updated : {moment(new Date(updatedAt)).fromNow()}</p>
  </Container>
)

Dates.propTypes = {
  createAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
}

export default Dates

