import React from 'react'
import {
  BarCont,
  Bar,
} from './HorizontalProgressBar.style';

const HorizontalProgressBar = ({ value, total, backgroundColor, color, height, ...props }) => {
  const percentage = (total === 0 ? 0 : (value / total) * 100);
  return (
    <BarCont backgroundColor={backgroundColor} height={height} {...props}>
      <Bar percentage={percentage} color={color} />
    </BarCont>
  )
}

HorizontalProgressBar.defaultProps = {
  value: 0,
  total: 0,
  color: '#0f35a9',
  backgroundColor: '#dfe1e6',
  height: 8
}

export default HorizontalProgressBar
