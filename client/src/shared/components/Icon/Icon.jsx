import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledIcon
} from './Icon.style';

const fontIconCodes = {
  [`user`]: '\f007',
  [`times`]: '\f00d',
  [`search`]: '\f002',
  [`lock`]: '\f023',
  [`check`]: '\f00c',
  [`envelope`]: '\f2b6',
  [`unlock`]: '\f09c',
  [`dashboard`]: '\f84c',
  [`inbox`]: '\f0f3',
  [`trash`]: '\f2ed',
  [`close`]: '\f00d',
  [`project`]: '\f0ae',
  [`setting`]: '\f013',
  [`sort-down`]: '\f0dd',
  [`angle-down`]: '\f107',
  [`plus`]: '\f067',
  [`task`]: '\f00c',
  [`priority-medium`]: '\f062',
  [`priority-low`]: '\f063',
  [`priority-lowest`]: '\f063',
  [`priority-high`]: '\f062',
  [`priority-highest`]: '\f062',
  [`user-icon`]: '',
  [`issue-purple`]: '',
  [`issue-yellow`]: '',
  [`issue-blue`]: '',
  [`issue-red`]: '',
  [`project-icon`]: '',
  [`task`]: '\f00c',
  [`bug`]: '\f12a',
  [`story`]: '\f02e',
  [`epic`]: '\f0e7',
};

const propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(fontIconCodes)),
  size: PropTypes.number,
  left: PropTypes.number,
  top: PropTypes.number,
  isSolid: PropTypes.bool
};

const defaultProps = {
  className: undefined,
  size: 16,
  left: 0,
  top: 0,
  isSolid: false
};

const Icon = ({ type, ...props }) => (
  <StyledIcon code={fontIconCodes[type]} type={type} {...props} />
);

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;

