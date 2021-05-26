import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";

const InitChart = (target, { labels, data }) => {
  return new Chart(target, {
    type: "bar",
    data: {
      labels: ["feb"],
      datasets: [
        {
          label: ["feb"],
          data: [23, 44],
          backgroundColor: "#333",
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      layout: {
        padding: {
          left: -10,
          right: 0,
          top: 0,
          bottom: -5,
        },
      },
      scales: {
        xAxes: [
          {
            barPercentage: 0.7,
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};
const BarChart = (props) => {
  //   const { chartData = [] } = props;

  //   const labels = chartData.map(
  //     (item) => `${item.year}/${String(item.month).padStart(2, "0")}`
  //   );
  //   const data = chartData.map((item) => item.monthly_searches);

  const canvasRef = useRef();

  //   useEffect(() => {
  //     const chart = InitChart(canvasRef.current);
  //     return () => chart.destroy();
  //   }, [chartData]);

  return <canvas ref={canvasRef} />;
};

export default BarChart;
