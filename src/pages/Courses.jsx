import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses on page load
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://ncp-backend-atpa.onrender.com/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.log("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <h2 className="text-center mt-24 text-xl font-medium animate-pulse">
        Loading courses...
      </h2>
    );
  }

  if (courses.length === 0) {
    return (
      <h2 className="text-center mt-24 text-xl font-medium text-gray-500">
        No courses available.
      </h2>
    );
  }

  // UI
  return (
    <div className="mt-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Available Courses
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="border border-gray-200 shadow-lg rounded-xl p-5 bg-white hover:scale-[1.02] transition"
          >
            <img
              src={course.img}
              alt={course.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />

            <h2 className="text-xl font-semibold text-gray-800">
              {course.title}
            </h2>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {course.description}
            </p>

            <h3 className="text-lg font-bold text-blue-600 mt-3">
              ₹ {course.price}
            </h3>

            <Link
              to={`/checkout/${course._id}`}
              className="block text-center mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Buy Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
