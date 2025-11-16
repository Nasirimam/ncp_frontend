import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://ncp-backend-atpa.onrender.com/api/auth/login",
        formData
      );

      // Save token + user details
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful!");

      setTimeout(() => {
        navigate("/courses");
        window.location.reload();
      }, 700);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            onChange={handleInput}
            placeholder="Enter your email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block font-medium mb-1">Password</label>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            required
            onChange={handleInput}
            placeholder="Enter password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ring-blue-400"
          />
          <span
            className="absolute right-3 top-10 text-gray-600 cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Button */}
        <button
          disabled={loading}
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition ${
            loading && "opacity-60 cursor-not-allowed"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}
