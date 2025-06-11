
export const sortReviewByUserFirst = (reviews, userId) => {
  return [...reviews].sort((a, b) => {
    if (a.userId === userId) return -1;
    if (b.userId === userId) return 1;
    return 0;
  });
};
