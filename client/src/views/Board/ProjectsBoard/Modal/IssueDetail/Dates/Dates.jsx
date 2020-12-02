import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Container
} from './Dates.style';
import Icon from '../../../../../../shared/components/Icon/Icon';

const Dates = ({ createAt, updatedAt, completedAt }) => (
  <Container>
    <p>Created : {moment(new Date(createAt)).format('lll')}</p>
    <p>Updated : {moment(new Date(updatedAt)).fromNow()}</p>
    {completedAt && (
      <p className="completed-text">
        <Icon type="check" isSolid={true} size={12} />
        Completed : {moment(new Date(completedAt)).fromNow()}</p>
    )}
  </Container>
)

Dates.propTypes = {
  createAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
}

export default Dates

