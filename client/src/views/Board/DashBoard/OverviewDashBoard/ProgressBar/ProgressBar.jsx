import React from 'react'
import PropTypes from 'prop-types'
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

export const ProgressBar = ({ tickets, projects }) => {

  const completedTickets = tickets.filter(ticket => {
    const project = projects[ticket.projectId];
    const lastColumnId = project.columnOrder[project.columnOrder.length - 1];
    return (ticket.columnId === lastColumnId);
  });

  const completedPercent = Math.floor((completedTickets.length / tickets.length) * 100);

  return (
    <Container>
      <Top>
        <Title>Overall Progress</Title>
      </Top>
      <Content>
        <ProgressProvider valueStart={0} valueEnd={completedPercent}>
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
                <Percentage>{completedPercent}<span className="percent-mark">%</span></Percentage>
                <CompleteText>COMPLETED</CompleteText>
              </InnerText>
            </CircularProgressbarWithChildren>
          )
          }
        </ProgressProvider>
        <Bottom>
          <span>Completed {completedPercent}% of {tickets.length} issues.</span>
        </Bottom>
      </Content>
    </Container>
  )
}

ProgressBar.propTypes = {
  tickets: PropTypes.array.isRequired,
  projects: PropTypes.object.isRequired
}

export default ProgressBar