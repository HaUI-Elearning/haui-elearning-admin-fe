import React from "react";
import { useNavigate } from "react-router-dom";
import CoursesAdmin from "../CourseAdmin/CourseAdmin";
import AdminUserList from "../AdminUserList/AdminUserList";

const AdminUserHome = () => {
  const navigate = useNavigate();


  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to Admin User Dashboard</h1>
      </header>

      
      <div style={{ marginTop: "40px" }}>
        <AdminUserList/>
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

export default AdminUserHome;
