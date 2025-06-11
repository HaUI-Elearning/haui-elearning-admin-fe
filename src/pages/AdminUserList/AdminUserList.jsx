import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";


export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUserCourses, setSelectedUserCourses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchUserCourses = async (userId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        `http://localhost:8080/api/v1/Admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const courses = res.data.data.listEnrollCourse || [];
      setSelectedUserCourses(courses);
      setOpenDialog(true);
    } catch (err) {
      console.error("Error fetching user details:", err);
      setSelectedUserCourses([]);
      setOpenDialog(true);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        `http://localhost:8080/api/v1/Admin/users/Role/2?current=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(res.data.data.result);
      setTotalPages(res.data.data.meta.pages);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length < 3) return "";
    const [year, month, day, hour = 0, minute = 0, second = 0] = dateArray;
    return `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year} ${hour}:${minute}`;
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ backgroundColor: "#e3f2fd", minHeight: "100vh", py: 4 }}
    >
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom color="primary">
          User List
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>User Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Enrolled Courses
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.username || "-"}</TableCell>
                <TableCell>
                 
                  {user.emailVerified ? (
                    <CheckCircleIcon
                      color="success"
                      fontSize="small"
                      sx={{ mr: 1 }}
                    />
                  ) : (
                    <CancelIcon color="error" fontSize="small" sx={{ ml: 1 }} />
                  )}
                   {user.email}{" "}
                </TableCell>
                <TableCell>{user.roleName}</TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell>
                  <Box display="flex" ml={4}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => fetchUserCourses(user.userId)}
                      sx={{ textTransform: "none" }}
                    >
                      View
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Paper>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Enrolled Courses</DialogTitle>
        <DialogContent dividers>
          {selectedUserCourses.length > 0 ? (
            <List>
              {selectedUserCourses.map((course) => (
                <ListItem key={course.courseId} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar variant="square" src={course.thumbnail} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={course.name}
                    secondary={`Instructor: ${
                      course.author
                    } - Price: ${new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(course.price)}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No courses found.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
