import axios from "axios";
import { create } from "zustand";
import { course, courseFromData, editCourse } from "../utils/types";
import { BACKEND_URL } from "../utils/backend_url";
import toast from "react-hot-toast";

type Store = {
  createCourse: (data: courseFromData) => any;
  fetchCourse: (id: Number) => Promise<course> | null;
  editCourse: (id:Number , data: any) => void;
};
export const useCourse = create<Store>((set) => ({
  createCourse: async (data: courseFromData) => {
    const response = await axios.post(`${BACKEND_URL}/course/create`, data, {
      withCredentials: true,
    });
    return response;
  },
  fetchCourse: async (id: Number) => {
    const response = await axios.get(`${BACKEND_URL}/course/get-course/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  },
  editCourse: async (id: Number, data: editCourse) => {
    try {
      const response = await axios.put(`${BACKEND_URL}/course/update-course/${id}`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast.success("Course Updated");
      }
    } catch (error) {
      toast.error("Error in updating course");
    }
  }
}));
