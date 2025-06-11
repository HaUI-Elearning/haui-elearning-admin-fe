import React from "react";
import { useNavigate } from "react-router-dom";
import CoursesAdmin from "../CourseAdmin/CourseAdmin";

const AdminCourseHome = () => {
  const navigate = useNavigate();


  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to Admin Courses Dashboard</h1>
      </header>

      <main style={styles.main}>
        <div style={styles.card} onClick={() => navigate("/pending-courses")}>
          Pending Courses
        </div>
        <div style={styles.card} onClick={() => navigate("/approve-courses")}>
          Approved Courses
        </div>
        <div style={styles.card} onClick={() => navigate("/rejected-courses")}>
          Rejected Courses
        </div>
      </main>
      <div style={{ marginTop: "40px" }}>
        <CoursesAdmin/>
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

export default AdminCourseHome;
