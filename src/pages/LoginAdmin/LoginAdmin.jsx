import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import axios from "axios";

import { loginValidate } from "../../utils/loginValidate";
import { setUser } from "../../store/userSlice";

import { IoIosArrowBack } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Alert, Snackbar, IconButton, InputAdornment } from "@mui/material";
import logo from "../../assets/images/logo.png";
import "./LoginAdmin.scss";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [showPassword, setShowPassword] = useState(false);

  const showSnackbar = useCallback((message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleLogin = useCallback(
    async (values) => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/v1/login/Admin",
          values
        );

        if (res.status === 200) {
          const { accessToken } = res.data.data;
          localStorage.setItem("accessToken", accessToken);
          dispatch(setUser({ accessToken }));
          showSnackbar("Login successful!");
          setTimeout(() => navigate("/"), 1500);
        }
      } catch (err) {
        const mess = err.response?.data?.error || "Login failed";
        showSnackbar(mess, "error");
      }
    },
    [dispatch, navigate, showSnackbar]
  );

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginValidate()}
          onSubmit={handleLogin}
        >
          {() => (
            <Form className="form">
              <div className="input-group">
                <Field
                  type="text"
                  name="username"
                  placeholder="Admin username"
                  autoComplete="off"
                  className="input-field"
                />
                <span className="icon">
                  <FaUser />
                </span>
              </div>
              <ErrorMessage
                name="username"
                component="p"
                className="errorMsg"
              />

              <div className="input-group">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input-field"
                />
                <span className="icon password-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </span>
              </div>
              <ErrorMessage
                name="password"
                component="p"
                className="errorMsg"
              />

              <button type="submit" className="button">
                Sign In
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%", fontSize: "1.2rem", padding: "16px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginAdmin;
