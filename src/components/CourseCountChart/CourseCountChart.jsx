import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Đăng ký components ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CourseCountChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Số lượng khóa học',
      data: [],
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
        '#9966FF', '#FF9F40', '#8AC24A', '#EA80FC', 
        '#00ACC1', '#FF7043'
      ],
      borderColor: '#fff',
      borderWidth: 1
    }]
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken")
        const response = await axios.get('http://localhost:8080/api/v1/reports/sales/course-count',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (response.data.data) {
          const categories = Object.keys(response.data.data);
          const courseCounts = Object.values(response.data.data);

          setChartData({
            labels: categories,
            datasets: [{
              ...chartData.datasets[0],
              data: courseCounts
            }]
          });
        }
      } catch (err) {
        setError('Không thể tải dữ liệu: ' + err.message);
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Cấu hình chart
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'COURSE STATISTICS BY CATEGORY',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: { bottom: 20 }
      },
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} courses`
        }
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="chart-container" style={{ 
      width: '100%', 
      height: '500px',
      margin: '20px 0',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      {loading ? (
        <div className="loading">Đang tải dữ liệu...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <Bar 
          data={chartData} 
          options={options}
          redraw
        />
      )}
    </div>
  );
};

export default CourseCountChart;