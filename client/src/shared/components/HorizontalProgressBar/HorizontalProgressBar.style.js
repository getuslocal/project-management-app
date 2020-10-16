import styled, { keyframes } from 'styled-components'

export const BarCont = styled.div`
  width: 100%;
  height: 8px;
  background-color: #dfe1e6;
  border-radius: 10px;
`;

const showProgress = ({ percentage }) => (
  keyframes`
    0% {
      width: 0;
    }
    100% {
    width: ${percentage}%;
    }
  `
);

export const Bar = styled.p`
  height: 100%;
  border-radius: 10px;
  background-color: ${props => props.color};
  animation: ${props => showProgress(props)} .7s ease forwards;
`;
