import axios, { AxiosResponse } from "axios";
import { create } from "zustand";
import { courseFromData } from "../utils/types";
import { BACKEND_URL } from "../utils/backend_url";
import toast from "react-hot-toast";

type Store = {
  createCourse: (data: courseFromData) => any;
};
export const useCourse = create<Store>((set) => ({
  createCourse: async (data: courseFromData) => {
    const response = await axios.post(`${BACKEND_URL}/course/create`, data, {
      withCredentials: true,
    });
    return response;
  },
}));
