import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement } from 'chart.js';

ChartJS.register(BarElement);

export function ScrollDepthChart({ data }) {
  const sections = ['Header', 'Content', 'Features', 'Footer'];
  const chartData = {
    labels: sections,
    datasets: [
      {
        label: 'Time Spent (seconds)',
        data: sections.map(() => Math.floor(Math.random() * 100)),
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
        borderColor: 'rgba(147, 51, 234, 0.8)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}