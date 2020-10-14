import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.plugins.unregister(ChartDataLabels);
// Chart.defaults.global.defaultFontColor = 'red';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const myChartRef = this.canvasRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: 'line',
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              display: false,
            },
          }],
          yAxes: [{
            display: true,
            gridLines: {
              color: 'rgba(0,0,0,.08)',
              borderDash: [2],
            },
          }]
        }
      },
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Created issues",
            data: [33, 53, 85, 41, 44, 65],
            fill: '+1',
            backgroundColor: "rgba(140, 215, 248, .2)",
            pointRadius: 4,
            pointHitRadius: 10,
            pointBorderWidth: 2,
            pointBackgroundColor: "#fff",
            pointBorderColor: 'rgba(140, 215, 248)',
            borderColor: "rgba(140, 215, 248)",
          },
          {
            label: "Resolved issues",
            data: [33, 25, 35, 51, 54, 76],
            fill: true,
            backgroundColor: "rgba(86, 3, 173, .1)",
            pointRadius: 4,
            pointHitRadius: 10,
            pointBorderWidth: 2,
            pointBackgroundColor: "#fff",
            pointBorderColor: '#a675f4',
            borderColor: "#a675f4"
          }
        ]
      }
    });
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default LineChart;