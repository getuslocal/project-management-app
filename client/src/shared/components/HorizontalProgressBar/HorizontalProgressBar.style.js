import styled, { keyframes } from 'styled-components';

export const BarCont = styled.div`
  width: 100%;
  height: ${(props) => props.height}px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 10px;
`;

const showProgress = ({ percentage }) =>
  keyframes`
    0% {
      width: 0;
    }
    100% {
    width: ${percentage}%;
    }
  `;

export const Bar = styled.p`
  height: 100%;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  animation: ${(props) => showProgress(props)} 0.7s ease forwards;
`;
