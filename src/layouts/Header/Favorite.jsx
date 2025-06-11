import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatMoney } from "../../utils/moneyFomatter";
import "./Header.scss";
import { fetchFavoriteItems } from "../../store/favoritesSlice";
const FavoriteIcon = () => {
  const favoriteItems = useSelector((state) => state.favorites.items);
  const accessToken = useSelector((state) => state.user.accessToken);
  const [isHovered, setIsHovered] = useState(false);
  const [courseDetails, setCourseDetails] = useState([]);
  const prevItems = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    if (accessToken) {
      dispatch(fetchFavoriteItems(accessToken));
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (JSON.stringify(prevItems.current) !== JSON.stringify(favoriteItems)) {
      prevItems.current = favoriteItems;

      const fetchCourseDetails = async () => {
        try {
          const details = await Promise.all(
            favoriteItems.map((course) =>
              axios
                .get(`http://localhost:8080/api/v1/courses/${course.courseId}`)
                .then((response) => response.data.data)
                .catch((error) => {
                  console.error("Lỗi khi lấy thông tin khóa học:", error);
                  return null;
                })
            )
          );
          setCourseDetails(details.filter((detail) => detail !== null));
        } catch (error) {
          console.error("Lỗi khi lấy thông tin khóa học:", error);
        }
      };

      if (favoriteItems.length > 0) {
        fetchCourseDetails();
      }
    }
  }, [favoriteItems]);

  const navigate = useNavigate();

  return (
    <div
      className="favoriteIcon"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FavoriteBorderIcon />
      {isHovered && (
        <div
          className="favorite-menu"
          style={{
            minHeight: "50px",
            maxHeight: "400px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {accessToken ? (
            <>
              <div
                className="favorite-items"
                style={{ flex: "1 1 80%", overflowY: "auto" }}
              >
                {favoriteItems.length > 0 ? (
                  courseDetails.map((item) => (
                    <div key={item.courseId}>
                      <div className="favorite-item">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="favorite-thumbnail"
                        />
                        <div className="favorite-item-details">
                          <span className="favorite-item-name">
                            {item.name}
                          </span>
                          <span className="favorite-item-author">
                            {item.author}
                          </span>
                          <span className="favorite-item-price">
                            {formatMoney(item.price)}
                          </span>
                        </div>
                      </div>
                      <hr className="hr" />
                    </div>
                  ))
                ) : (
                  <div
                    className="empty-favorites"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      color: "#555",
                      backgroundColor: "#f9f9f9",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                    }}
                  >
                    <h3>Your Wishlist is empty</h3>
                    <button
                      style={{
                        marginTop: "5px",
                        backgroundColor: "black",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: "pointer",
                        color: "white",
                        transition: "background-color 0.3s ease",
                      }}
                      onClick={() => navigate("/")}
                    >
                      Explore more courses
                    </button>
                  </div>
                )}
              </div>
              {favoriteItems.length > 0 && (
                <div className="navigate-button">
                  <button onClick={() => navigate("/my-course/my-wishlist")}>
                    Go to whishlist
                  </button>
                </div>
              )}
            </>
          ) : (
            <div
              className="login-prompt"
              style={{
                padding: "10px",
                border: "1px solid #f5c6cb",
                borderRadius: "5px",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bolder",
              }}
            >
              <p>Sign in to use this feature</p>
              <button
                onClick={() => navigate("/signIn")}
                style={{ fontSize: "14px", padding: "5px", marginTop: "5px" }}
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoriteIcon;
