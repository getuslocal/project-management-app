import styled from 'styled-components';
import { color } from '../../utils/styles';

export const Container = styled.div`
  position: relative;
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
  display: flex;
  align-items: center;

  & > i {
    position: absolute;
    right: 6px;
    top: auto;
  }
`;

export const Input = styled.input`
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
  padding: 7px 20px 7px 7px;
  font-size: 14px;
  border: none;
  background-color: ${color.backgroundLightest2};
  border-radius: 3px;
  border: 2px solid ${color.borderMedium};
  transition: all 0.3s;

  &:hover {
    background-color: ${color.hoverGray};
  }

  &:focus {
    background-color: ${color.white};
    border-color: ${color.borderInputFocus};
  }
`;
