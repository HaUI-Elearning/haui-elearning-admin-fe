import axios from "axios";

export const getLessonsByChapter = (chapterId, token) => {
  return axios.get(`http://localhost:8080/api/v1/Teacher/getAll/Lesson/${chapterId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
