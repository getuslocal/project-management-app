import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

class DoughnutChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const myChartRef = this.canvasRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: 'doughnut',
      data: {
        labels: ["TO DO", "IN PROGRESS", "IN REVIEW", "DONE"],
        datasets: [{
          data: [40, 18, 35, 51],
          // backgroundColor: ['rgba(15,53,169, .8)', 'rgba(140, 215, 248, .6)', 'rgba(101,186,67, .4)', 'rgba(86, 3, 173, .4)'],
          backgroundColor: ['rgba(15,53,169, .9)', 'rgba(140, 215, 248, .85)', 'rgba(101,186,67, .6)', 'rgba(86, 3, 173, .7)'],
          borderColor: ['rgba(15,53,169)', 'rgba(140, 215, 248)', 'rgba(101,186,67, .6)', 'rgba(86, 3, 173, .7)'],
          borderWidth: 3
          // borderColor: 'red,'
        }],
      },
      plugins: [ChartDataLabels],
      options: {
        maintainAspectRatio: false,
        animation: {
          duration: 1000
        },
        plugins: {
          datalabels: {
            color: 'white',
            labels: {
              title: {
                font: {
                  weight: 'bold',
                  size: '14'
                }
              },
            }
          }
        },
        legend: {
          position: "right",
          labels: {
            fontSize: 14,
            padding: 20,
          }
        },
      },
    });
  }

  render() {
    // console.log(this.props.data)
    return <canvas ref={this.canvasRef} />;
  }
}

export default DoughnutChart;