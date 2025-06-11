import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PNF from "../../assets/images/PNF.jpg";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "80vh",
        bgcolor: "#fdfbe4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: 4,
      }}
    >
      {/* 🖼 Illustration */}
      <Box
        component="img"
        src={PNF}
        alt="Page not found"
        sx={{
          width: { xs: "70%", sm: "350px" },
          mb: 4,
        }}
      />

      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: "#A435F0",
          mb: 1,
        }}
      >
        Oops! Page not found
      </Typography>

      <Typography
        variant="body1"
        sx={{
          maxWidth: 420,
          mb: 4,
          color: "text.secondary",
        }}
      >
        We couldn’t find what you were looking for. <br />
        It might be moved or no longer exists 🚫
      </Typography>

      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: "#A435F0",
          "&:hover": { backgroundColor: "#9228B3" },
          px: 4,
          py: 1.5,
          fontWeight: "bold",
          fontSize: "1rem",
          borderRadius: "12px",
        }}
        onClick={() => navigate("/")}
      >
        Back to Homepage
      </Button>
    </Box>
  );
};

export default NotFoundPage;
