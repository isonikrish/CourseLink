import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { signupFormData } from "../utils/types";
import { useAuth } from "../stores/useAuth";


function Signup({setIsLogin}: any) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signup } = useAuth();
  const [formData, setFormData] = useState<signupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    await signup(formData);

    setIsLoading(false);
    setIsLogin(true)
  }

  return (
    <form
      className="mx-auto p-6 shadow-md rounded-md mt-3 max-w-xl"
      onSubmit={handleSignup}
    >
      <div className="flex gap-4 mb-4">
        <div className="w-full">
          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            id="firstName"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
        </div>

        <div className="w-full">
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            id="lastName"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          placeholder="Type here"
          className="input input-bordered w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          id="email"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
      </div>

      <div className="mb-4 relative">
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Type here"
          className="input input-bordered w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          id="password"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[53px] transform -translate-y-1/2 cursor-pointer"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </span>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Role <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-6">
          <div className="flex items-center">
            <input
              type="radio"
              id="userRole"
              name="role"
              value="user"
              className="form-radio h-4 w-4 text-indigo-600 cursor-pointer"
              required
              onChange={() => setFormData({ ...formData, role: "student" })}
            />
            <label htmlFor="userRole" className="ml-2 text-sm">
              Student
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="adminRole"
              name="role"
              value="admin"
              className="form-radio h-4 w-4 text-indigo-600 cursor-pointer"
              onChange={() => setFormData({ ...formData, role: "tutor" })}
            />
            <label htmlFor="adminRole" className="ml-2 text-sm">
              Tutor
            </label>
          </div>
        </div>
      </div>

      <div>
        <button
          className="w-full btn text-lg font-medium rounded-full px-4 py-2 shadow-[0px_-1px_0px_0px_#FFFFFF40_inset,_0px_2px_2px_0px_#FFFFFF40_inset]"
          type="submit"
        >
          {isLoading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
}

export default Signup;
