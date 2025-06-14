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
  Tooltip,
  Pagination,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const TopSellingCoursesAdmin = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Bắt đầu từ 1 vì Pagination component là 1-based
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const fetchTopSellingCourses = async (pageNumber, pageSize) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://localhost:8080/api/v1/reports/sales/top-selling-courses",
        {
          params: {
            page: pageNumber - 1, // backend bắt đầu từ 0
            size: pageSize,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;
      setCourses(data.content || []);
      setTotalPages(data.totalPages || 0);
      setTotalItems(data.totalElements || 0);
    } catch (err) {
      console.error("Error fetching top-selling courses:", err.response || err);
      setError("Unable to load top-selling courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopSellingCourses(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getMedalIcon = (index) => {
    const colors = ["gold", "silver", "#cd7f32"];
    if (index < 3) {
      return (
        <Tooltip title={`Top ${index + 1}`}>
          <EmojiEventsIcon sx={{ color: colors[index], mr: 1 }} />
        </Tooltip>
      );
    }
    return null;
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Top-Selling Courses
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
            <Typography mt={2}>No top-selling courses found.</Typography>
          ) : (
            <Paper>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "primary.main" }}>
                      <TableCell sx={{ color: "white" }}><strong>#</strong></TableCell>
                      <TableCell sx={{ color: "white" }}><strong>Name</strong></TableCell>
                      <TableCell sx={{ color: "white" }}><strong>Category</strong></TableCell>
                      <TableCell align="right" sx={{ color: "white" }}><strong>Price</strong></TableCell>
                      <TableCell align="right" sx={{ color: "white" }}><strong>Quantity Sold</strong></TableCell>
                      <TableCell align="right" sx={{ color: "white" }}><strong>Total Sales</strong></TableCell>
                      <TableCell sx={{ color: "white" }}><strong>Author</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {courses.map((course, index) => (
                      <TableRow
                        key={course.courseId}
                        sx={{
                          backgroundColor: index % 2 === 0 ? "grey.50" : "white",
                          "&:hover": { backgroundColor: "grey.100" },
                        }}
                      >
                        <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            {getMedalIcon(index)}
                            {course.courseName}
                          </Box>
                        </TableCell>
                        <TableCell>{course.categoryName}</TableCell>
                        <TableCell align="right">
                          {course.price?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </TableCell>
                        <TableCell align="right">{course.quantitySold}</TableCell>
                        <TableCell align="right">
                          {course.totalSales?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </TableCell>
                        <TableCell>{course.author}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Phân trang dạng nút bên ngoài */}
              <Box display="flex" justifyContent="center" mt={2} pb={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  shape="rounded"
                  showFirstButton
                  showLastButton
                />
              </Box>
            </Paper>
          )}
        </>
      )}
    </Box>
  );
};

export default TopSellingCoursesAdmin;
