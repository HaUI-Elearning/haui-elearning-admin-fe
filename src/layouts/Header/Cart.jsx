import "./Header.scss";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { formatMoney } from "../../utils/moneyFomatter";
import { fetchCartItems } from "../../store/cartSlice";

const CartIcon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const accessToken = useSelector((state) => state.user.accessToken);
  const [isHovered, setIsHovered] = useState(false);
  const [courseDetails, setCourseDetails] = useState([]);
  const prevItems = useRef();

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchCartItems(accessToken));
    }
  }, [accessToken, dispatch]);
  useEffect(() => {
    if (JSON.stringify(prevItems.current) !== JSON.stringify(cartItems)) {
      prevItems.current = cartItems;

      const fetchCourseDetails = async () => {
        try {
          const details = await Promise.all(
            cartItems.map((course) =>
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

      if (cartItems?.length > 0) {
        fetchCourseDetails();
      }
    }
  }, [cartItems]);
  return (
    <div
      className="cartIcon"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ShoppingCartSharpIcon />
      {isHovered && (
        <div
          className="cart-menu"
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
                className="cart-items"
                style={{ flex: "1 1 80%", overflowY: "auto" }}
              >
                {cartItems?.length > 0 ? (
                  courseDetails.map((item) => (
                    <div key={item.courseId}>
                      <div className="cart-item">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="favorite-thumbnail"
                        />
                        <div className="cart-item-details">
                          <span className="cart-item-name">{item.name}</span>
                          <span className="cart-item-author">
                            {item.author}
                          </span>
                          <span className="cart-item-price">
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
                    <h3>Your cart is empty</h3>
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

              {cartItems?.length > 0 && (
                <div className="navigate-button">
                  <button onClick={() => navigate("/cart")}>Go to Cart</button>
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

export default CartIcon;
