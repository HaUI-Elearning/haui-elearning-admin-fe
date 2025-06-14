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
  Pagination, // thêm Pagination từ MUI
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import "./CourseAdmin.scss";

const CoursesAdmin = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // 1-based để đồng bộ với Pagination
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const fetchPendingCourses = async (pageNumber, pageSize) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://localhost:8080/api/v1/Admin/courses",
        {
          params: {
            current: pageNumber,
            pageSize: pageSize,
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

  const totalPages = Math.ceil(totalItems / rowsPerPage);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Courses
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
            <Typography mt={2}>No courses found.</Typography>
          ) : (
            <Paper>
              <TableContainer>
                <Table>
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
                              <button className="approve-btn">Approve</button>
                              <button className="reject-btn">Rejected</button>
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

              {/* Pagination */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={2}
              >
                <FormControl size="small">
                  <InputLabel>Rows</InputLabel>
                  <Select
                    value={rowsPerPage}
                    label="Rows"
                    onChange={(e) => {
                      setRowsPerPage(parseInt(e.target.value, 10));
                      setPage(1);
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
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            </Paper>
          )}
        </>
      )}
    </Box>
  );
};

export default CoursesAdmin;
