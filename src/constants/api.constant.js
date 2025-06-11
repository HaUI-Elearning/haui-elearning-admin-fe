export const BASE_URL = "http://localhost:8080/api/v1";
export const ApiConstant = {
  auth: {
    login: "/login",
    register: "/register",
  },
  slider: {
    getAll: "/images",
  },
  course: {
    getAllCourse: "/allcourse",
    getCourseByCategory: "/category/:categoryId",
    getCourseById: "/courses/:courseId",
  },
  categories: {
    getAllCategories: "/categories",
  },
  chapter: {
    getAllChapter: (CourseId) => `getAll/${CourseId}/Chapters`,
    getChapterById: (CourseId, ChapterId) =>
      `getChapter/${CourseId}/${ChapterId}`,
    deleteChapter: (courseId, chapterId) =>
      `${courseId}/Chapter/delete/${chapterId}`,
    addChapter: (CourseId, title, description) => {
      const params = new URLSearchParams({
        CourseId,
        title,
        description,
      }).toString();
      return `${CourseId}/Chapter/add?${params}`;
    },
    updateChapter: (CourseId, ChapterId, title, description, position) => {
      const params = new URLSearchParams({
        ChapterId,
        title,
        description,
        position,
      }).toString();
      return `${CourseId}/Chapter/update?${params}`;
    },
  },
};
