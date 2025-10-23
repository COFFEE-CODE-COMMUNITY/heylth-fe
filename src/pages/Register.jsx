import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userRegister } from "../services/authService";

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: 0,
    sex: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const jenisKelamin = [
    { value: 'L', label: 'Laki-Laki'},
    { value: 'W', label: 'Wanita'},
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await userRegister(formData);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Failed to create account");
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
              onChange={(e) => handleChange("username", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={e => handleChange("email", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
              required
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={formData.age}
              onChange={e => handleChange("age", parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
              required
            />
          </div>
          
          <div>
            <label htmlFor="sex" className="block text-gray-700 mb-2">
              Sex
            </label>
            <select 
              name="sex" 
              id="sex"
              value={formData.sex}
              onChange={e => handleChange('sex', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
              required
            > 
              <option value={'Selecting Sex'}  key={'Selecting Sex'} selected> Select your Sex:</option>
              {jenisKelamin.map(jk => (
                <option value={jk.value} key={jk.value}> {jk.label} </option>
              ))}
            </select>
            {/* <input
              type="text"
              id="sex"
              value={formData.sex}
              onChange={e => handleChange("sex", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
              required
            /> */}
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#007DFC] text-white py-2 rounded-lg hover:bg-[#0066cc] transition-colors disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Have an account?{" "}
          <Link to="/login" className="text-[#007DFC] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
