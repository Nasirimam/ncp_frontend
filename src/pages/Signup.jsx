import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // validation
    if (formData.password !== formData.cpassword) {
      return toast.error("Passwords do not match!");
    }
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters!");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://ncp-backend-atpa.onrender.com/api/auth/signup",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      toast.success("Account created successfully!");
      console.log(res.data);

      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Create Account
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            required
            onChange={handleInput}
            placeholder="Enter your name"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ring-blue-400"
          />
        </div>

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
        <div className="mb-4 relative">
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

        {/* Confirm Password */}
        <div className="mb-6 relative">
          <label className="block font-medium mb-1">Confirm Password</label>
          <input
            type={showConfirm ? "text" : "password"}
            name="cpassword"
            required
            onChange={handleInput}
            placeholder="Re-enter password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ring-blue-400"
          />
          <span
            className="absolute right-3 top-10 text-gray-600 cursor-pointer"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          disabled={loading}
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
