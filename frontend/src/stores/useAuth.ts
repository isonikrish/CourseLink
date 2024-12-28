import { create } from "zustand";
import { loginFormData, signupFormData, User } from "../utils/types";
import axios from "axios";
import { BACKEND_URL } from "../utils/backend_url";
import toast from "react-hot-toast";
type Store = {
  user: User | null;
  setUser: (user: User) => void;
  signup: (data: signupFormData) => void;
  login: (data: loginFormData) => void;
};
export const useAuth = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signup: async (data: signupFormData) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/user/signup`, data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("Signup successfull");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Signup failed");
    }
  },

  login: async (data: loginFormData) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/user/login`, data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("Login successfull");
        set({ user: response.data });
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Login failed");
    }
  },
}));
