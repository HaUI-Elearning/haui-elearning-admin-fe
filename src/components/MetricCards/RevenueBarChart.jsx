import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { chartColors, formatCurrency } from '../../utils/utils';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

export const RevenueBarChart = ({ data }) => {
  const chartData = {
    labels: ['Revenue'], // Translated
    datasets: [
      {
        label: 'Total Revenue ', // Translated
        data: [data?.revenueMonth || 0],
        backgroundColor: chartColors.blue,
        borderColor: chartColors.blue,
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => formatCurrency(ctx.raw)
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => formatCurrency(value)
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <h3>Total Revenue</h3> {/* Translated */}
      <Bar data={chartData} options={options} />
    </div>
  );
};