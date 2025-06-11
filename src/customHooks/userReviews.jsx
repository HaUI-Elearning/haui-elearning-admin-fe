// useReviews.js
import { useState, useEffect } from "react";
import { getCommentByCourseId } from "../apis/getCommentByCourseId";
import { sortReviewByUserFirst } from "../utils/sortReviewByUserFirst ";
import { addReview } from "../apis/addReview";
import { updateReview } from "../apis/updateReview";
import { deleteReview } from "../apis/deleteReview";

const useReviews = ({ courseId, initialReviews = [], userId }) => {
  const [reviewList, setReviewList] = useState([]);
  const [myReview, setMyReview] = useState(null);

  useEffect(() => {
    const sorted = sortReviewByUserFirst(initialReviews, userId);
    setReviewList(sorted);
  }, [initialReviews, userId]);

  useEffect(() => {
    const existingReview = reviewList.find((r) => r.userId === userId);
    setMyReview(existingReview || null);
  }, [reviewList, userId]);

  const refreshReviews = async () => {
    const res = await getCommentByCourseId(courseId);
    const sorted = sortReviewByUserFirst(res.listReview, userId);
    setReviewList(sorted);
    return sorted;
  };

  const handleAdd = async (comment, rating) => {
    const res = await addReview({ courseId, comment, rating });
    const sorted = await refreshReviews();
    setMyReview(res.data.comment);
    return sorted;
  };

  const handleUpdate = async (reviewId, comment, rating) => {
    const res = await updateReview({ reviewId, comment, rating });
    const sorted = await refreshReviews();
    setMyReview(res.data.comment);
    return sorted;
  };

  const handleDelete = async (reviewId) => {
    setMyReview(null);
    await deleteReview(reviewId);
    const sorted = await refreshReviews();
    return sorted;
  };

  return {
    reviewList,
    myReview,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
};

export default useReviews;
