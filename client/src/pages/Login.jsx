import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMainContext } from '../contexts/Context.jsx';
import SignupForm from '../components/Signup.jsx';
import LoginForm from '../components/Login.jsx';

function Login() {
  const navigate = useNavigate();
  const { user } = useMainContext();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(prevIsLogin => !prevIsLogin);
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] ">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border">
        <h2 className="text-3xl font-bold text-center text-[#8128D9] mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <div className="w-full">
          {isLogin ? <LoginForm /> : <SignupForm />}
        </div>

        <p className="text-center mt-6 text-gray-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            className="text-[#8128D9] cursor-pointer hover:underline"
            onClick={toggleForm}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
