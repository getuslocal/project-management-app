import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { color, fontSize, padding } from '../../../utils/styles';

export const Container = styled.p`
  display: inline-block;
  width: 50%;

  &.active {
    a {
      border-color: ${color.primary};
      color: ${color.primary};
    }
  }
`;

export const CustomLink = styled(Link)`
  display: inline-block;
  color: ${color.textLight};
  line-height: 1;
  padding: ${padding.double} ${padding.double};
  border: 0;
  text-align: center;
  cursor: pointer;
  font-weight: 400;
  width: 100%;
  height: 100%;
  border-bottom: 4px solid transparent;

  &:before {
    padding-right: 0.85em;
    font-size: ${fontSize.small2};
  }

  &:hover {
    color: ${color.primary};
  }
`;
