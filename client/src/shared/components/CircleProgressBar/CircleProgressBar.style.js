import styled from 'styled-components';
import { string } from 'prop-types';

import CircleProgressBarBase from './CircleProgressBar';

const CircleProgressBar = styled(CircleProgressBarBase)`
  max-width: ${(props) => props.maxSize};
  margin: 0 auto;
  vertical-align: middle;
  position: relative;
  top: 50%;
  transform: translateY(-50%);

  .chart-text {
    fill: ${(props) => props.textColor};
    transform: translateY(0.25em);
  }
  .chart-number {
    font-size: 8px;
    /* font-weight: 300; */
    line-height: 1;
    text-anchor: middle;
    transform: translateY(-0.6em);
    transform: translateY(-4px);
    fill: #fff;
    font-family: 'Poppins', sans-serif;

    tspan {
      font-size: 4px;
    }
  }
  .chart-label {
    font-size: 0.18em;
    font-weight: 300;
    text-transform: uppercase;
    text-anchor: middle;
    transform: translateY(0.7em);
    fill: #fff;
    font-family: 'Poppins', sans-serif;
  }
  .figure-key [class*='shape-'] {
    margin-right: 8px;
  }
  .figure-key-list {
    list-style: none;
    display: flex;
    justify-content: space-between;
  }
  .figure-key-list li {
    margin: 5px auto;
    color: #fff;
  }
  .shape-circle {
    display: inline-block;
    vertical-align: middle;
    width: 21px;
    height: 21px;
    border-radius: 50%;
    background-color: ${(props) => props.strokeColor};
    text-transform: capitalize;
  }
`;

CircleProgressBar.propTypes = {
  textColor: string,
  strokeColor: string,
  maxSize: string,
};

CircleProgressBar.defaultProps = {
  textColor: 'black',
  strokeColor: 'blueviolet',
  maxSize: '100vh',
};

export default CircleProgressBar;
