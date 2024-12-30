import { useState, useEffect } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useAuth } from "../stores/useAuth";
import { useNavigate } from "react-router-dom";

function Authentication() {
  const [isLogin, setIsLogin] = useState(true);
  const {user} = useAuth()
  const navigate = useNavigate()
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[user])
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="rounded-lg p-8 border-2 border-base-300 shadow-lg mt-4">
        <div className="flex flex-col items-center">
          {isLogin ? (
            <div className="text-center">
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-gray-600 mt-2">
                Don't have an account?{" "}
                <span
                  className="text-blue-500 hover:underline cursor-pointer"
                  onClick={() => setIsLogin(false)}
                >
                  Sign up
                </span>
              </p>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-3xl font-bold">Create Your Account</h1>
              <p className="text-gray-600 mt-2">
                Already have an account?{" "}
                <span
                  className="text-blue-500 hover:underline cursor-pointer"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </span>
              </p>
            </div>
          )}
          <div className="w-[500px]">
            {isLogin ? <Login /> : <Signup setIsLogin={setIsLogin}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
