import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { loginFormData } from "../utils/types";
import { useAuth } from "../stores/useAuth";

function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login, user } = useAuth();
  const [formData, setFormData] = useState<loginFormData>({
    email: "",
    password: "",
  });
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    await login(formData);

    setIsLoading(false);
  }
  return (
    <form
      className="mx-auto p-6 shadow-md rounded-md mt-3 max-w-xl"
      onSubmit={handleLogin}
    >
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

      <div>
        <button
          className="w-full btn text-lg font-medium rounded-full px-4 py-2 shadow-[0px_-1px_0px_0px_#FFFFFF40_inset,_0px_2px_2px_0px_#FFFFFF40_inset] mt-3"
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

export default Login;
