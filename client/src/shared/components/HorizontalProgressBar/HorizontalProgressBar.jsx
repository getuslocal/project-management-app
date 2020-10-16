import React from 'react'
import {
  BarCont,
  Bar,
} from './HorizontalProgressBar.style';

const HorizontalProgressBar = ({ value, total, color }) => {
  return (
    <BarCont>
      <Bar percentage={(value / total) * 100} color={color} />
    </BarCont>
  )
}

HorizontalProgressBar.defaltProps = {
  value: 0,
  total: 0,
  color: '#0f35a9'
}

export default HorizontalProgressBar
