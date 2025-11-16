import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

// Import PrivateRoute
import PrivateRoute from "./components/PrivateRoute.jsx";

// Import pages
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Courses from "./pages/Courses.jsx";
import Checkout from "./pages/Checkout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-20 max-w-6xl mx-auto px-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/courses" element={<Courses />} />

          <Route
            path="/checkout/:id"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
