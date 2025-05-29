import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/pexels.jpg';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      if (step === 'login') {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || 'Login failed');
        } else if (data.step === 'verify') {
          setStep('verify');
          setMessage(data.message);
        } else {
          setError('Unexpected response from server.');
        }
      } else if (step === 'verify') {
        const res = await fetch('http://localhost:5000/api/auth/verify-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code: code.trim() }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || 'Verification failed');
        } else {
          setMessage(data.message);
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
          localStorage.setItem('isLoggedIn', 'true');
          setTimeout(() => {
            navigate('/user');
          }, 1000);
        }
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    }
    setLoading(false);
  };

   return (
    <div className="min-h-screen bg-[url(././assets/pexels.jpg)] bg-center bg-cover bg-no-repeat flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
        {/* Header with HSBC branding */}
        <div className="bg-red-600 py-5 px-6 flex items-center">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
            <div className="w-7 h-7 bg-red-600 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-white text-xl font-bold"></h1>
            <p className="text-red-100 text-xs">Global Banking and Markets</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {step === 'login' ? 'Secure Log On' : 'Two-Step Verification'}
            </h2>
            {step === 'verify' && (
              <button 
                onClick={() => setStep('login')}
                className="text-gray-500 hover:text-red-600 flex items-center text-sm"
              >
                <FaArrowLeft className="mr-1" /> Back
              </button>
            )}
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {step === 'login' ? (
              <>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 
                        <FaEyeSlash className="text-gray-400 hover:text-gray-600" /> : 
                        <FaEye className="text-gray-400 hover:text-gray-600" />
                      }
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <label className="flex items-center space-x-2 text-sm text-gray-600">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" 
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-red-600 hover:text-red-800 hover:underline">
                    Forgot password?
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="bg-blue-50 p-4 rounded-lg flex items-start mb-4">
                  <FaShieldAlt className="text-blue-500 mt-1 mr-2" />
                  <p className="text-sm text-blue-700">
                    {message || "A verification code has been sent to your email. Please enter it below."}
                  </p>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    required
                  />
                </div>
                
                <div className="text-center text-sm text-gray-500 mt-2">
                  Didn't receive the code? 
                  <button 
                    type="button" 
                    className="ml-1 text-red-600 hover:text-red-800 hover:underline"
                    onClick={() => console.log("Resend code")}
                  >
                    Resend
                  </button>
                </div>
              </>
            )}

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-300 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {step === 'login' ? 'Logging in...' : 'Verifying...'}
                </span>
              ) : step === 'login' ? 'Log On' : 'Verify Code'}
            </button>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 text-red-700 text-sm">
                <p>{error}</p>
              </div>
            )}
          </form>
        </div>

        <div className="bg-gray-50 py-4 px-6 border-t border-gray-200">
          <div className="flex justify-between text-xs text-gray-500">
            <span></span>
            <div>
              <a href="#" className="hover:text-red-600 mr-3">Security</a>
              <a href="#" className="hover:text-red-600">Help</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;