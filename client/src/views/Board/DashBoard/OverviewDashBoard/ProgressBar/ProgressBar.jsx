import React from 'react'
import { connect } from 'react-redux'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProgressProvider from "../../../../../shared/components/ProgressProvider/ProgressProvider";
import {
  Container,
  Title,
  Content,
  Top,
  InnerText,
  Percentage,
  CompleteText,
  Bottom
} from './ProgressBar.style';

export const ProgressBar = ({ tickets }) => {
  return (
    <Container>
      <Top>
        <Title>Overall Progress</Title>
      </Top>
      <Content>
        <ProgressProvider valueStart={0} valueEnd={66}>
          {value => (
            <CircularProgressbarWithChildren
              value={value}
              strokeWidth={3}
              circleRatio={0.75}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 8,
                textColor: '#fff',
                trailColor: "#062b9c",
                pathTransitionDuration: .8,
                pathColor: "#8CD7F8",
              })}
            >
              <InnerText style={{ fontSize: 12, marginTop: -5 }}>
                <Percentage>66<span className="percent-mark">%</span></Percentage>
                <CompleteText>COMPLETED</CompleteText>
              </InnerText>
            </CircularProgressbarWithChildren>
          )
          }
        </ProgressProvider>
        <Bottom>
          <span>We completed {66}% of {tickets.length} issues.</span>
        </Bottom>
      </Content>
    </Container>
  )
}

// ProgressBar.propTypes = {
//   prop: PropTypes
// }

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, null)(ProgressBar)
