import React, { useEffect, useState } from "react";
import axios from "axios";
import { MetricCards } from "../../components/MetricCards/MetricCards";
import { RevenueBarChart } from "../../components/MetricCards/RevenueBarChart";
import "./AdminDashboard.scss";
import { CourseStatusPieChart } from "../../components/MetricCards/CourseStatusPieChart";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://localhost:8080/api/v1/reports/overview",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStats(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Đang tải dữ liệu...</div>;

  return (
    <div className="admin-dashboard">
    
      <MetricCards data={stats} />

      <div className="charts-row">
        <CourseStatusPieChart data={stats} />
        <RevenueBarChart data={stats} />
      </div>
    </div>
  );
};

export default AdminDashboard;
