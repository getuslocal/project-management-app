import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const barChartOption = {
  maintainAspectRatio: false,
  legend: {
    // display: false,
    // position: 'top',
    labels: {
      fontColor: '#172b4d',
      fontStyle: "500",
      fontSize: 14,
      boxWidth: 14,
      fontFamily: "Poppins",
      padding: 20
    }
  },
  animation: {
    duration: 1000
  },
  // responsive: true,
  scales: {
    xAxes: [{
      stacked: true,
      gridLines: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        fontColor: 'rgba(0,0,0,.3)',
        fontStyle: "bold",
      },
    }],
    yAxes: [{
      stacked: true,
      gridLines: {
        color: 'rgba(0,0,0,.08)',
        borderDash: [3],
        drawBorder: false,
      },
      ticks: {
        fontColor: 'rgba(0,0,0,.3)',
        fontStyle: "bold",
        padding: 10
      },
    }]
  }
}

const BarChart = () => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const myChartRef = canvasRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: 'bar',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Completed tasks",
            data: [3, 6, 9, 10, 4, 2, 4, 7, 2, 5, 3, 9],
            backgroundColor: "#8CD7F8",
            barThickness: 20,
          },
          {
            label: "All tasks",
            data: [12, 8, 4, 2, 4, 5, 6, 2, 6, 8, 4, 6],
            backgroundColor: "#0f35a9",
            barThickness: 20,
          },
        ]
      },
      options: barChartOption,
    });
  }, []);

  return (
    <canvas ref={canvasRef} />
  );
}

export default BarChart;