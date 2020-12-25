import React from 'react';
import PropTypes from 'prop-types';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProgressProvider from '../../../../../shared/components/ProgressProvider/ProgressProvider';
import {
  Container,
  Title,
  Content,
  Top,
  InnerText,
  Percentage,
  CompleteText,
  Bottom,
} from './ProgressBar.style';
import { useEffect } from 'react';
import { useState } from 'react';

export const ProgressBar = ({ tickets, projects }) => {
  const [completedPercentage, setCompletedPercentage] = useState(0);

  useEffect(() => {
    const completedPercentage = getCompletedPercentage(projects, tickets);
    setCompletedPercentage(completedPercentage);
  }, []);

  const getCompletedPercentage = (projects, tickets) => {
    let doneIssues = 0;

    Object.values(projects).forEach((project) => {
      const doneColumn = Object.values(project.columns).find(
        (column) => column.isDoneColumn
      );
      doneIssues = doneIssues + doneColumn.taskIds.length;
    });

    if (doneIssues === 0) return 0;

    return Math.floor((doneIssues / tickets.length) * 100);
  };

  return (
    <Container>
      <Top>
        <Title>Overall Progress</Title>
      </Top>
      <Content>
        <ProgressProvider valueStart={0} valueEnd={completedPercentage}>
          {(value) => (
            <CircularProgressbarWithChildren
              value={value}
              strokeWidth={3}
              circleRatio={0.75}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 8,
                textColor: '#fff',
                trailColor: '#062b9c',
                pathTransitionDuration: 0.8,
                pathColor: '#8CD7F8',
              })}
            >
              <InnerText style={{ fontSize: 12, marginTop: -5 }}>
                <Percentage>
                  {completedPercentage}
                  <span className="percent-mark">%</span>
                </Percentage>
                <CompleteText>COMPLETED</CompleteText>
              </InnerText>
            </CircularProgressbarWithChildren>
          )}
        </ProgressProvider>
        <Bottom>
          <span>
            Completed {completedPercentage}% of {tickets.length} issues.
          </span>
        </Bottom>
      </Content>
    </Container>
  );
};

ProgressBar.propTypes = {
  tickets: PropTypes.array.isRequired,
  projects: PropTypes.object.isRequired,
};

export default ProgressBar;
