// File: src/pages/Admin/PendingCoursesAdmin.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PendingCoursesAdmin = () => {
  // State quản lý dữ liệu khóa học, loading/error, phân trang
  const [courses, setCourses] = useState([]); // mảng khóa học pending
  const [loading, setLoading] = useState(false); // hiển thị spinner khi fetch
  const [error, setError] = useState(null); // lưu lỗi (nếu có)
  const [page, setPage] = useState(0); // trang hiện tại (0-based)
  const [rowsPerPage, setRowsPerPage] = useState(10); // số dòng mỗi trang
  const [totalItems, setTotalItems] = useState(0); // tổng số khóa học (từ meta.total)
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const navigate = useNavigate();

  // Hàm gọi API để lấy danh sách khóa học “pending”
  const fetchPendingCourses = async (pageNumber, pageSize) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://localhost:8080/api/v1/Admin/courses",
        {
          params: {
            current: pageNumber + 1, // backend dùng 1-based indexing
            pageSize: pageSize,
            Status: "pending",
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Dữ liệu backend trả về có dạng: { meta: {...}, result: [ ... ] }
      const data = response.data.data;
      console.log("Raw API data:", data);

      // courses hiện tại có trong data.result, tổng phần tử trong data.meta.total
      setCourses(data.result || []);
      setTotalItems(data.meta?.total || 0);
    } catch (err) {
      console.error("Error fetching pending courses:", err.response || err);
      setError("Unable to load pending courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Khi component mount, hoặc page/rowsPerPage thay đổi → gọi lại API
  useEffect(() => {
    fetchPendingCourses(page, rowsPerPage);
  }, [page, rowsPerPage]);
  const handleOpenRejectDialog = (courseId) => {
    setSelectedCourseId(courseId);
    setRejectReason("");
    setRejectDialogOpen(true);
  };
  const handleApprove = async (courseId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `http://localhost:8080/api/v1/Admin/courses/${courseId}/Confirm`,
        {}, // không có body khi duyệt
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Đã duyệt khóa học thành công");
      fetchPendingCourses(page, rowsPerPage);
    } catch (err) {
      console.error("Approve error:", err);
      toast.error("Từ chối khóa học thất bại.");
    }
  };

  const handleConfirmReject = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `http://localhost:8080/api/v1/Admin/courses/${selectedCourseId}/Confirm`,
        null, // body là null
        {
          params: {
            reason: rejectReason, // ✅ đưa lý do vào query string
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Đã từ chối khóa học.");
      fetchPendingCourses(page, rowsPerPage);
    } catch (err) {
      console.error("Reject error:", err);
      toast.error("Từ chối khóa học thất bại.");
    } finally {
      setRejectDialogOpen(false);
      setSelectedCourseId(null);
    }
  };

  // Xử lý chuyển trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Xử lý thay đổi số dòng mỗi trang
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={3}>
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{ mb: 8, ml: -2 }}
      >
        BACK
      </Button>

      <Typography variant="h5" gutterBottom>
        Pending Courses
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      ) : (
        <>
          {courses.length === 0 ? (
            <Typography mt={2}>No pending courses found.</Typography>
          ) : (
            <Paper>
              <TableContainer>
                <Table aria-label="pending courses table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>ID</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Name</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Thumbnail</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Author</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Created At</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Price (VND)</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Status</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.courseId}>
                        <TableCell>{course.courseId}</TableCell>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>
                          <img
                            src={course.thumbnail}
                            alt=""
                            className="img-course"
                          />
                        </TableCell>
                        <TableCell>{course.author}</TableCell>
                        <TableCell>
                          {new Date(course.createdAt).toLocaleString("vi-VN", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </TableCell>
                        <TableCell>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(course.price)}
                        </TableCell>
                        <TableCell>
                          {course.approvalStatus === "pending" ? (
                            <>
                              <Button
                                variant="contained"
                                color="success"
                                size="small"
                                sx={{ mr: 1 }}
                                onClick={() => handleApprove(course.courseId)}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() =>
                                  handleOpenRejectDialog(course.courseId)
                                }
                              >
                                Rejected
                              </Button>
                            </>
                          ) : course.approvalStatus === "approved" ? (
                            <Box
                              display="flex"
                              alignItems="center"
                              gap={1}
                              color="green"
                            >
                              ✅ Duyệt
                            </Box>
                          ) : (
                            <Box
                              display="flex"
                              alignItems="center"
                              gap={1}
                              color="red"
                            >
                              ❌ Rejected
                            </Box>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                component="div"
                count={totalItems}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Rows per page"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} of ${count}`
                }
              />
            </Paper>
          )}
        </>
      )}
      <Dialog
        open={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
      >
        <DialogTitle>Rejected Course</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="reason rejected"
            type="text"
            fullWidth
            multiline
            minRows={3}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialogOpen(false)}>Hủy</Button>
          <Button
            onClick={handleConfirmReject}
            variant="contained"
            color="error"
            disabled={!rejectReason.trim()}
          >
            Rejected
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PendingCoursesAdmin;
