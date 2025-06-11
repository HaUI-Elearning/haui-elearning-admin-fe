import React from "react";
import { useNavigate } from "react-router-dom";
import TopSellingCoursesAdmin from "../../components/TopSellingCoursesAdmin/TopSellingCoursesAdmin"; // ← Nhớ chỉnh đúng đường dẫn
import CourseCountChart from "../../components/CourseCountChart/CourseCountChart";
import AdminDashboard from "../AdminDashboard/AdminDashboard";

const AdminHome = () => {
  const navigate = useNavigate();

 

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to Admin Dashboard</h1>
        
      </header>

      <main style={styles.main}>
        
      </main>

      {/* ⬇ Hiển thị bảng TopSellingCoursesAdmin bên dưới */}
      <div style={{ marginTop: "0px" }}>
        <AdminDashboard/>
      </div>
      <div style={{ marginTop: "40px" }}>
        <TopSellingCoursesAdmin/>
      </div>
      <div style={{ marginTop: "40px" }}>
        <CourseCountChart/>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },
  logoutBtn: {
    backgroundColor: "#ff4d4f",
    border: "none",
    color: "white",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  main: {
    display: "flex",
    gap: "30px",
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 4px 12px rgb(0 0 0 / 0.1)",
    textAlign: "center",
    fontSize: "1.25rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
};

export default AdminHome;
