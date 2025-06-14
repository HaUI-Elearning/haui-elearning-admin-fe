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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CoursesAdmin = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const navigate = useNavigate();

  const fetchPendingCourses = async (pageNumber, pageSize) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://localhost:8080/api/v1/Admin/courses",
        {
          params: {
            current: pageNumber + 1,
            pageSize: pageSize,
            Status: "pending",
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;
      setCourses(data.result || []);
      setTotalItems(data.meta?.total || 0);
    } catch (err) {
      console.error("Error fetching pending courses:", err.response || err);
      setError("Unable to load pending courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        {},
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
        { reason: rejectReason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ✅ Fix lỗi: Tính tổng số trang
  const totalPages = Math.ceil(totalItems / rowsPerPage);

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
      ) : courses.length === 0 ? (
        <Typography mt={2}>No pending courses found.</Typography>
      ) : (
        <Paper>
          <TableContainer>
            <Table aria-label="pending courses table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Thumbnail</strong></TableCell>
                  <TableCell><strong>Author</strong></TableCell>
                  <TableCell><strong>Created At</strong></TableCell>
                  <TableCell><strong>Price (VND)</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
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
                        <Box display="flex" alignItems="center" gap={1} color="green">
                          ✅ Approved
                        </Box>
                      ) : (
                        <Box display="flex" alignItems="center" gap={1} color="red">
                          ❌ Rejected
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <FormControl size="small">
              <InputLabel>Rows</InputLabel>
              <Select
                value={rowsPerPage}
                label="Rows"
                onChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
              >
                {[5, 10, 20, 50].map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Pagination
              count={totalPages}
              page={page + 1}
              onChange={(e, value) => setPage(value - 1)}
              color="primary"
            />
          </Box>
        </Paper>
      )}

      <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)}>
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

export default CoursesAdmin;
