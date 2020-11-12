import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import HorizontalProgressbar from '../../../../../shared/components/HorizontalProgressBar/HorizontalProgressBar';
import {
  Container,
  Left,
  Right,
  InnerText,
  IssueCount,
  Detail,
  DetailTop,
  Status,
} from './DoughnutChart.style';

// Set some options for doughnut chart.
const doughnutChartOption = {
  maintainAspectRatio: false,
  // responsive: false,
  animation: {
    duration: 1000
  },
  cutoutPercentage: 65,
  legend: {
    display: false,
  },
};

const DoughnutChart = () => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const myChartRef = canvasRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: 'doughnut',
      data: {
        labels: ["TO DO", "IN PROGRESS", "IN REVIEW", "DONE"],
        datasets: [{
          data: [40, 18, 35, 51],
          backgroundColor: ['rgba(15,53,169, .9)', 'rgba(140, 215, 248, .85)', 'rgba(101,186,67, .6)', 'rgba(86, 3, 173, .7)'],
        }],
      },
      options: doughnutChartOption
    });
  }, [])

  return (
    <Container>
      <Left>
        <canvas ref={canvasRef} />
        <InnerText>
          <IssueCount>82</IssueCount>
          issues
        </InnerText>
      </Left>
      <Right>
        <Detail>
          <DetailTop>
            Todo
            <Status><span>30</span> / 82 issues</Status>
          </DetailTop>
          <HorizontalProgressbar color="#0f35a9" value={40} total={82} />
        </Detail>
        <Detail>
          <DetailTop>
            In progress
            <Status><span>18</span> / 82 issues</Status>
          </DetailTop>
          <HorizontalProgressbar color="#8CD7F8" value={18} total={82} />
        </Detail>
        <Detail>
          <DetailTop>
            In review
            <Status><span>14</span> / 82 issues</Status>
          </DetailTop>
          <HorizontalProgressbar color="rgba(101,186,67, .6)" value={14} total={82} />
        </Detail>
        <Detail>
          <DetailTop>
            Done
            <Status><span>30</span> / 82 issues</Status>
          </DetailTop>
          <HorizontalProgressbar color="rgba(86, 3, 173, .7)" value={30} total={82} />
        </Detail>
      </Right>
    </Container>
  )
}

export default DoughnutChart;