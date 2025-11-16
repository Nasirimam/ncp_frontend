import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  // Fetch specific course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get("https://ncp-backend-atpa.onrender.com/api/courses");
        const selected = res.data.find((c) => c._id === id);
        setCourse(selected);
      } catch (err) {
        toast.error("Failed to load course", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handlePayment = async () => {
    if (!course) return;

    setPaying(true);

    try {
      // 1. Create order from backend
      const orderRes = await axios.post(
        "https://ncp-backend-atpa.onrender.com/api/payment/createOrder",
        { amount: course.price }
      );

      const order = orderRes.data;

      // 2. Razorpay checkout options
      const options = {
        key: "rzp_test_RgJnkNPbcthhKd",
        amount: order.amount,
        currency: "INR",
        name: "Course Purchase",
        description: course.title,
        order_id: order.id,
        handler: function (response) {
          toast.success("Payment Successful!", response);

          setTimeout(() => {
            navigate("/courses"); // redirect or create success page
          }, 1200);
        },
        theme: { color: "#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Payment failed", err);
    }

    setPaying(false);
  };

  if (loading) return <h2 className="text-center mt-20 text-xl">Loading...</h2>;

  if (!course)
    return (
      <h2 className="text-center mt-20 text-xl text-red-500">
        Course not found
      </h2>
    );

  return (
    <div className="mt-10 p-6 max-w-xl mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
      <img
        src={course.img}
        alt={course.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-2xl font-bold mt-4">{course.title}</h2>
      <p className="text-gray-600 mt-2">{course.description}</p>
      <h3 className="text-blue-600 text-xl font-bold mt-4">₹ {course.price}</h3>

      <button
        onClick={handlePayment}
        disabled={paying}
        className={`w-full mt-6 bg-blue-600 text-white py-2 rounded-lg text-lg hover:bg-blue-700 transition ${
          paying && "opacity-50 cursor-not-allowed"
        }`}
      >
        {paying ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
