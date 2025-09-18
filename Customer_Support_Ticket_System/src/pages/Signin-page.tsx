
// src/pages/SignIn.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SignInData } from '../api/auth';
import { signIn } from '../api/auth';
const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const data: SignInData = { email, password };
      const response = await signIn(data);

      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      alert('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-semibold ${
              loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Signup link */}
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
