import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // For redirection after login/logout

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [displayUser, setDisplayUser] = useState();
  const navigate = useNavigate();

  // Function to get user info after login
  const getMe = async () => {
    try {
      const response = await axios.get("http://localhost:9294/api/auth/me", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUser(response.data?.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };
  useEffect(() => {
    getMe();
  }, []);

  // Handle signup
  const handleSignup = async (fullName, email, password, role) => {
    try {
      const response = await axios.post(
        "http://localhost:9294/api/auth/signup",
        { fullName, email, password, role },
        { withCredentials: true }
      );
      if (response.status === 201) {
        toast.success("Signup successful");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    }
  };

  // Handle login
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:9294/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Login successful");
        setUser(response.data?.user); 
        navigate("/home");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9294/api/auth/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Logout successful");
        setUser(null);
        navigate("/");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };
  const handleGetUser = async (userId) =>{
    try {
      const response = await axios.get(
        `http://localhost:9294/api/user/${userId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setDisplayUser(response.data);
      } else {
        console.error("Fetching user failed. Please try again.");
      }
    } catch (error) {
      console.error("Fetching user failed. Please try again.");
    }
  }
  const onUpdateProfile = async (formData) => {
    try {
      const response = await axios.put("http://localhost:9294/api/user/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        // Update the user context with the new data
        setUser(response.data.user);
      } else {
        toast.error("Profile update failed. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Profile update failed. Please try again.");
    }
  };
  
  return (
    <MainContext.Provider value={{ user, handleSignup, handleLogin, handleLogout , handleGetUser, displayUser, onUpdateProfile}}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  return useContext(MainContext);
};
