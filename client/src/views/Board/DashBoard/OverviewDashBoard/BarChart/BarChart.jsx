import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import moment from 'moment';
import { color } from '../../../../../shared/utils/styles';

const generateLabels = () => {
  let label = [];
  const startDate = moment();
  for (let i = 0; i < 12; i++) {
    label.unshift(startDate.format('DD MMM'));
    startDate.subtract(14, 'days');
  }
  return label;
};

const generateCreatedIssuesData = (tickets) => {
  let issues = [];
  const startDate = moment();
  for (let i = 0; i < 12; i++) {
    const matchedTickets = tickets.filter((ticket) => {
      return moment(ticket.createdAt).isBetween(
        moment(startDate).subtract(14, 'days'),
        startDate,
        'days',
        '[]'
      );
    });
    startDate.subtract(14, 'days');
    issues.unshift(matchedTickets.length);
  }
  return issues;
};

const generateCompletedIssuesData = (tickets) => {
  let issues = [];
  const startDate = moment();
  for (let i = 0; i < 12; i++) {
    const matchedTickets = tickets.filter((ticket) => {
      if (!ticket.completedAt) return false;
      return moment(ticket.completedAt).isBetween(
        moment(startDate).subtract(14, 'days'),
        startDate,
        'days',
        '[]'
      );
    });
    startDate.subtract(14, 'days');
    issues.unshift(matchedTickets.length);
  }
  return issues;
};

const BarChart = ({ tickets }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const myChartRef = canvasRef.current.getContext('2d');
    new Chart(myChartRef, {
      type: 'bar',
      data: {
        labels: generateLabels(),
        datasets: [
          {
            label: 'Created issues',
            data: generateCreatedIssuesData(tickets),
            backgroundColor: '#0f35a9',
            // barThickness: 10,
            barPercentage: 0.9,
            categoryPercentage: 0.4,
          },
          {
            label: 'Completed issues',
            data: generateCompletedIssuesData(tickets),
            backgroundColor: '#8CD7F8',
            // barThickness: 10,
            barPercentage: 0.9,
            categoryPercentage: 0.4,
          },
        ],
      },
      options: barChartOption,
    });
  }, []);

  return <canvas ref={canvasRef} />;
};

const barChartOption = {
  maintainAspectRatio: false,
  legend: {
    // display: false,
    // position: 'top',
    labels: {
      fontColor: color.textDark,
      fontStyle: '500',
      fontSize: 14,
      boxWidth: 14,
      fontFamily: 'Poppins',
      padding: 20,
    },
  },
  animation: {
    duration: 1000,
  },
  // responsive: true,
  scales: {
    xAxes: [
      {
        // stacked: true,
        gridLines: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          fontColor: color.textLight,
          fontStyle: 'bold',
        },
      },
    ],
    yAxes: [
      {
        // stacked: true,
        gridLines: {
          color: 'rgba(0,0,0,.08)',
          borderDash: [3],
          drawBorder: false,
        },
        ticks: {
          fontColor: color.textLight,
          fontStyle: 'bold',
          padding: 10,
          beginAtZero: true,
        },
      },
    ],
  },
};

export default BarChart;
