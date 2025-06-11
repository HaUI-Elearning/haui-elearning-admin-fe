import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayoutAdmin from "./layouts/MainLayoutAdmin";
import AdminHome from "./pages/AdminHome/AdminHome";
import PendingCoursesAdmin from "./pages/PendingCoursesAdmin/PendingCoursesAdmin";
import LoginAdmin from "./pages/LoginAdmin/LoginAdmin";
import AdminCourseHome from "./pages/AdminCourseHome/AdminCourseHome";
import TopSellingCoursesAdmin from "./components/TopSellingCoursesAdmin/TopSellingCoursesAdmin";
import CourseCountChart from "./components/CourseCountChart/CourseCountChart";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // đừng quên import CSS
import ApproveCoursesAdmin from "./pages/PendingCoursesAdmin/ApproveCourseAdmin";
import RejectedCoursesAdmin from "./pages/PendingCoursesAdmin/RejectedCourseAdmin";
import AdminUserHome from "./pages/AdminUserHome/AdminUserHome";
import AdminTeacherHome from "./pages/AdminTeacherHome/AdminTeacherHome";
import AdminOderHome from "./pages/AdminOderHome/AdminOderHome";

function App() {
  return (
    <>
      <Routes>
        {/* Trang đăng nhập Admin */}
        <Route path="/login" element={<LoginAdmin />} />

        {/* Admin phần nằm trong layout MainLayoutAdmin */}
        <Route path="/" element={<MainLayoutAdmin />}>
          <Route index element={<AdminHome />} />
          <Route path="dashboard" element={<AdminHome />} />
          <Route path="/pending-courses" element={<PendingCoursesAdmin />} />
          <Route path="/approve-courses" element={<ApproveCoursesAdmin/>} />
          <Route path="/rejected-courses" element={<RejectedCoursesAdmin/>} />
          <Route path="/admin-course-home" element={<AdminCourseHome />} />
          <Route path="/admin-user-home" element={<AdminUserHome/>} />
          <Route path="/admin-teacher-home" element={<AdminTeacherHome/>} />
          <Route path="/admin-oder-home" element={<AdminOderHome/>} />
          <Route
            path="/admin-TopSellingCourses"
            element={<TopSellingCoursesAdmin />}
          />
          <Route path="/admin-course-count" element={<CourseCountChart />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>

      {/* Toast Container ở cấp App, để toàn bộ app dùng được toast */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
