import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';

// BarChart
class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const myChartRef = this.canvasRef.current.getContext("2d");

    this.myChart = new Chart(myChartRef, {
      type: 'bar',
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100
              }
            }
          ]
        }
      },
      data: {
        labels: ["LOWEST", "LOW", "MEDIUM", "HIGH", "HIGHEST"],
        datasets: [{
          label: this.props.title,
          data: [40, 18, 35, 51],
          backgroundColor: ['rgba(15,53,169,.8)', 'rgba(140, 215, 248, .85)', 'rgba(101,186,67, .6)', 'rgba(86, 3, 173, .7)']
        }]
      }
    });
  }

  render() {
    return (
      <canvas ref={this.canvasRef} />
    );
  }
}

export default BarChart;