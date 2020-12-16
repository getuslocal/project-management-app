import styled from 'styled-components';
import { color } from '../../utils/styles';

export const SpinnerOverlay = styled.div`
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.filled ? color.white : 'unset'};

  & > p {
    position: absolute;
    top: 40vh;
    margin: 0;
  }
`;

export const SpinnerContainer = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid #0f35a9;
  border-radius: 50%;
  border-top-color: #8CD7F8;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
