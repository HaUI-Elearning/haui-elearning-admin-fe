import axios from "axios";
import { BASE_URL, ApiConstant } from "../constants/api.constant";

const api = axios.create({
  baseURL: `${BASE_URL}/Teacher`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const chaptersApi = () => ({
  getAllChapter: async (courseId) =>
    api.get(ApiConstant.chapter.getAllChapter(courseId)),

  deleteChapter: async (courseId, chapterId) =>
    api.delete(ApiConstant.chapter.deleteChapter(courseId, chapterId)),

  addChapter: async (courseId, title, description, position) => {
    const params = new URLSearchParams({ title, description, position });
    return api.post(`${courseId}/Chapter/add?${params.toString()}`);
  },

  getChapterById: async (courseId, chapterId) =>
    api.get(ApiConstant.chapter.getChapterById(courseId, chapterId)),
  updateChapter: async (CourseId, ChapterId, title, description, position) => {
    const query = new URLSearchParams({
      ChapterId,
      title,
      description,
      position,
    }).toString();

    return api.put(`${CourseId}/Chapter/update?${query}`);
  },
});

export const {
  getAllChapter,
  deleteChapter,
  addChapter,
  getChapterById,
  updateChapter,
} = chaptersApi();
