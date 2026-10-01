import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // BUG #13: No validation – login proceeds with any input
    const success = login(email, password);
    if (success) navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-primary">🛒 ShopKart</Link>
          <h2 className="text-xl font-bold text-gray-800 mt-4">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {isRegister ? 'Join ShopKart today' : 'Sign in to your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          {!isRegister && (
            <div className="text-right">
              <button type="button" className="text-sm text-primary hover:underline">Forgot password?</button>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-yellow-500 text-black py-3 rounded-xl font-bold transition-colors"
          >
            {isRegister ? 'Create Account' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-primary font-semibold ml-1 hover:underline"
          >
            {isRegister ? 'Login' : 'Sign Up'}
          </button>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded-xl text-xs text-center text-gray-600">
          💡 <strong>Demo:</strong> Click Login with any input to enter as a demo user.
        </div>
      </div>
    </div>
  );
}
