import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { selectProjectById } from '../../../../../redux/projects/projects.selectors';
import {
  Container,
  Left,
  Right,
  InnerText,
  IssueCount,
  Detail,
  DetailTop,
  ColorBox,
  CompletionText
} from './DoughnutChart.style';
import { color } from '../../../../../shared/utils/styles';

Chart.plugins.unregister(ChartDataLabels);

// Set some options for doughnut chart.
const doughnutChartOption = {
  maintainAspectRatio: false,
  // responsive: false,
  animation: {
    duration: 1000
  },
  cutoutPercentage: 50,
  legend: {
    position: 'right',
    labels: {
      fontSize: 13.5,
      fontStyle: 600,
      fontColor: color.textDark,
      padding: 14,
      fontFamily: "Poppins, 'sans-serif'",
      boxWidth: 14
    },
    display: false,
  },
  plugins: {
    // Change options for ALL labels of THIS CHART
    datalabels: {
      color: '#fff',
      font: {
        size: '16',
        weight: '600'
      }
    },
  }
};

const colors = ['#0f35a9', '#8CD7F8', 'rgba(101,186,67, .6)', 'rgba(101, 84, 192)', '#CAF0F8', 'rgba(228, 77, 66, .8)', 'rgba(253, 180, 77,.8)', 'rgb(89, 140, 255)'];

const DoughnutChart = ({ project: { columns, columnOrder } }) => {
  const canvasRef = useRef(null);
  const [numberOfIssues, setNumberOfIssues] = useState(0);
  const [completeness, setCompleteness] = useState(0);

  useEffect(() => {
    const myChartRef = canvasRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: 'doughnut',
      plugins: [ChartDataLabels],
      data: {
        labels: Object.values(columns).map(column => {
          if (column.title.length > 24) {
            return column.title.substring(0, 24) + '...';
          }
          return column.title
        }),
        datasets: [{
          data: Object.values(columns).map(column => column.taskIds.length),
          backgroundColor: Object.values(columns).map((column, index) => colors[index]),
        }],
      },
      options: doughnutChartOption
    });

    let sum = 0;

    Object.values(columns).forEach(column => {
      sum = sum + column.taskIds.length;
    });

    setNumberOfIssues(getNumberOfIssues(columns))
    setCompleteness(getCompleteness(columns, columnOrder))
  }, []);

  const getNumberOfIssues = (columns) => {
    let sum = 0;

    Object.values(columns).forEach(column => {
      sum = sum + column.taskIds.length;
    });

    return sum;
  }

  const getCompleteness = (columns, columnOrder) => {
    const lastColumn = Object.values(columns).find(column => column.id === columnOrder[columnOrder.length - 1]);
    return ((lastColumn.taskIds.length / getNumberOfIssues(columns)) * 100).toFixed(0);
  }

  return (
    <Container>
      <Left>
        <canvas ref={canvasRef} />
        <InnerText>
          <IssueCount>{numberOfIssues}</IssueCount>
          issues
        </InnerText>
        <CompletionText>
          <span>Completed {completeness}% of {numberOfIssues} issues.</span>
        </CompletionText>
      </Left>
      <Right>
        {
          Object.values(columns).map((column, index) => (
            <Detail>
              <DetailTop>
                <ColorBox style={{ backgroundColor: colors[index] }}></ColorBox>
                {column.title}
              </DetailTop>
            </Detail>
          ))
        }
      </Right>
    </Container>
  )
}

DoughnutChart.propTypes = {
  project: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  project: selectProjectById(ownProps.projectId),
})

export default connect(mapStateToProps, null)(DoughnutChart)
