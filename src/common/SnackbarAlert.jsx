//commom folder: checked
import PropTypes from "prop-types";
import { Snackbar, Alert } from "@mui/material";

const SnackbarAlert = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%", fontSize: "1.2rem", padding: "16px" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
SnackbarAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(["error", "warning", "info", "success"]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SnackbarAlert;
