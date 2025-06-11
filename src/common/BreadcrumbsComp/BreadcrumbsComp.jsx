import { Breadcrumbs, Typography, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import PropTypes from "prop-types";
import styles from "./styles";
const BreadcrumbsComp = ({ course, onHomeClick }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={styles.breadcrumb}>
      <MuiLink
        component={RouterLink}
        to="/"
        sx={styles.homeLink}
        onClick={onHomeClick}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Home
      </MuiLink>
      <Typography sx={styles.grainText}>
        <PlayLessonIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        {course.name}
      </Typography>
    </Breadcrumbs>
  );
};

BreadcrumbsComp.propTypes = {
  course: PropTypes.object,
  onHomeClick: PropTypes.func,
};
export default BreadcrumbsComp;
