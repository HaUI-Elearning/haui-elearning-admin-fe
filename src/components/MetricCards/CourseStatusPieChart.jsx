import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { chartColors } from '../../utils/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

export const CourseStatusPieChart = ({ data }) => {
  const chartData = {
    labels: ['Approved', 'Rejected', 'Pending'], // Translated labels
    datasets: [{
      data: [
        data?.TotalApprovedCourse || 0, 
        data?.TotalRejectedCourse || 0, 
        data?.TotalPendingCourse || 0
      ],
      backgroundColor: [chartColors.green, chartColors.red, chartColors.yellow],
      borderWidth: 0
    }]
  };

  const options = {
    plugins: {
      legend: { position: 'right' },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((ctx.raw / total) * 100).toFixed(1);
            return `${ctx.label}: ${ctx.raw} courses (${percentage}%)`; // Translated tooltip
          }
        }
      }
    },
    cutout: '70%'
  };

  return (
    <div className="chart-container">
      <h3>Course Approval Status</h3> {/* Translated title */}
      <Doughnut data={chartData} options={options} />
    </div>
  );
};