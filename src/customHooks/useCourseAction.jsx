import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCartApi, fetchCartItems } from "../store/cartSlice";
import {
  addToFavoritesApi,
  fetchFavoriteItems,
  removeFromFavoritesApi,
} from "../store/favoritesSlice";
import { enrollCourse } from "../apis/enrollCourseFree";
export const useCourseActions = (course) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.user.accessToken);
  const cartItems = useSelector((state) => state.cart.items);
  const favorites = useSelector((state) => state.favorites.items);

  const isInCart = cartItems?.some((item) => item.courseId === course.courseId);
  const isFavorited = favorites?.some(
    (item) => item.courseId === course.courseId
  );

  const handleCartClick = async () => {
    if (!accessToken) return;

    if (isInCart) {
      navigate("/cart");
    } else {
      await dispatch(
        addToCartApi({ courseId: course.courseId, accessToken })
      ).unwrap();
      await dispatch(fetchFavoriteItems(accessToken)).unwrap();
    }
  };

  const handleFavoriteClick = async () => {
    if (!accessToken) return;

    if (isFavorited) {
      await dispatch(
        removeFromFavoritesApi({ courseId: course.courseId, accessToken })
      ).unwrap();
    } else {
      await dispatch(
        addToFavoritesApi({ courseId: course.courseId, accessToken })
      ).unwrap();
    }
    await dispatch(fetchCartItems(accessToken)).unwrap();
  };

  const handleEnrollClick = async () => {
    try {
      const enrolledCourse = await enrollCourse(course.courseId);
      navigate(`/enrolled/${enrolledCourse.courseId}`, {
        state: { enrolledCourse },
      });
    } catch (error) {
      alert("Fail to enroll course: " + (error.message || "Error occurred"));
    }
  };

  return {
    accessToken,
    isInCart,
    isFavorited,
    handleCartClick,
    handleFavoriteClick,
    handleEnrollClick,
  };
};
