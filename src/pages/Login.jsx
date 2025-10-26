import { useState } from 'react';
import { useNavigate, Link, UNSAFE_getTurboStreamSingleFetchDataStrategy } from 'react-router-dom';
import { userLogin } from '../services/authService';

export const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = await userLogin(formData);
      console.log(userData);
      localStorage.setItem('token', userData.data.user.token);
      localStorage.setItem('email', userData.data.user.email);
      localStorage.setItem('username', userData.data.user.username);
      localStorage.setItem('age', userData.data.user.age);
      localStorage.setItem('sex', userData.data.user.sex);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffafa] px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to <span className="text-[#007DFC]">Heylth</span>!
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={e => handleChange('username', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={e => handleChange('password', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#007DFC] text-white py-2 rounded-lg hover:bg-[#0066cc] transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#007DFC] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
