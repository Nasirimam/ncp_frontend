import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBook,
  FaSignInAlt,
  FaUserPlus,
  FaPowerOff,
  FaUser,
  FaCog,
  FaGraduationCap,
  FaChevronDown,
} from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Safely parse stored user
  const savedUser = useMemo(() => {
    try {
      const value = localStorage.getItem("user");
      if (!value || value === "undefined") return null;
      return JSON.parse(value);
    } catch {
      console.warn("Invalid user JSON found in localStorage.");
      return null;
    }
  }, []);

  const isLoggedIn = !!localStorage.getItem("token");
  const avatar = savedUser?.name?.charAt(0)?.toUpperCase() || "U";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserDropdownOpen(false);
    navigate("/");
    window.location.reload();
  };

  const links = [
    {
      title: "Home",
      path: "/",
      icon: <FaHome />,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Courses",
      path: "/courses",
      icon: <FaBook />,
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const authLinks = !isLoggedIn
    ? [
        {
          title: "Login",
          path: "/login",
          icon: <FaSignInAlt />,
          color: "from-green-500 to-emerald-500",
        },
        {
          title: "Signup",
          path: "/signup",
          icon: <FaUserPlus />,
          color: "from-orange-500 to-red-500",
        },
      ]
    : [];

  // Multi-color gradient for the navbar background
  const navbarBackground =
    "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500";

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`${navbarBackground} shadow-lg fixed top-0 left-0 w-full z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              className="text-2xl font-black text-white hover:text-gray-200 transition-colors duration-200"
              to="/"
            >
              CourseStore
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-6 font-medium">
              {[...links, ...authLinks].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-white hover:text-gray-200 flex items-center gap-2 transition-colors duration-200 px-4 py-2 rounded-xl hover:bg-white/10 backdrop-blur-sm"
                >
                  <span className="text-lg">{link.icon}</span>
                  {link.title}
                </Link>
              ))}

              {isLoggedIn && (
                <div className="relative" ref={dropdownRef}>
                  {/* User Dropdown Trigger */}
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-2xl px-4 py-2 transition-all duration-200 border border-white/20 text-white"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full flex justify-center items-center font-bold text-sm shadow-lg">
                      {avatar}
                    </div>
                    <span className="font-medium max-w-32 truncate">
                      {savedUser?.name || "User"}
                    </span>
                    <FaChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        userDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* User Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-2xl">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {savedUser?.name || "User"}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {savedUser?.email || "user@example.com"}
                        </p>
                      </div>

                      {/* Dropdown Links */}

                      <Link
                        to="/courses"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-200 group"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                          <FaGraduationCap className="w-3 h-3 text-white" />
                        </div>
                        Courses
                      </Link>

                      {/* Logout Section */}
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                            <FaPowerOff className="w-3 h-3 text-white" />
                          </div>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-2xl text-white hover:text-gray-200 transition-colors bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-lg"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 backdrop-blur-lg shadow-2xl z-50 p-6 border-r border-white/20 transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-2xl text-white hover:text-gray-200 transition-colors bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-lg"
        >
          <FaTimes />
        </button>

        {/* User Section */}
        {isLoggedIn && savedUser && (
          <div className="mt-8 flex flex-col items-center pb-6 border-b border-white/20">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full flex justify-center items-center text-2xl font-bold shadow-lg">
              {avatar}
            </div>
            <p className="mt-3 font-bold text-white text-lg">
              {savedUser.name}
            </p>
            <p className="text-sm text-white/80 mt-1">{savedUser.email}</p>

            {/* Mobile User Links */}
            <div className="flex flex-col w-full mt-4 space-y-2">
              <Link
                to="/profile"
                className="flex items-center justify-center gap-2 px-4 py-3 text-white hover:bg-white/20 rounded-xl transition-all duration-200 backdrop-blur-sm"
                onClick={() => setOpen(false)}
              >
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded flex items-center justify-center">
                  <FaUser className="w-3 h-3" />
                </div>
                My Profile
              </Link>
              <Link
                to="/my-courses"
                className="flex items-center justify-center gap-2 px-4 py-3 text-white hover:bg-white/20 rounded-xl transition-all duration-200 backdrop-blur-sm"
                onClick={() => setOpen(false)}
              >
                <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded flex items-center justify-center">
                  <FaGraduationCap className="w-3 h-3" />
                </div>
                My Courses
              </Link>
            </div>
          </div>
        )}

        {/* Sidebar Menu */}
        <div className="mt-6 space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center gap-4 p-4 text-white hover:bg-white/20 rounded-xl transition-all duration-200 text-lg font-medium backdrop-blur-sm group"
              onClick={() => setOpen(false)}
            >
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-r ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
              >
                <span className="text-lg text-white">{link.icon}</span>
              </div>
              {link.title}
            </Link>
          ))}

          {/* Auth Links for Mobile */}
          {!isLoggedIn &&
            authLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center gap-4 p-4 text-white hover:bg-white/20 rounded-xl transition-all duration-200 text-lg font-medium backdrop-blur-sm group"
                onClick={() => setOpen(false)}
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-r ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                >
                  <span className="text-lg text-white">{link.icon}</span>
                </div>
                {link.title}
              </Link>
            ))}

          {/* Logout for Mobile */}
          {isLoggedIn && (
            <button
              className="flex items-center gap-4 p-4 text-white hover:bg-red-500/20 rounded-xl transition-all duration-200 w-full text-lg font-medium backdrop-blur-sm group"
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <FaPowerOff className="text-lg text-white" />
              </div>
              Logout
            </button>
          )}
        </div>

        {/* Settings Link for Mobile */}
        {isLoggedIn && (
          <div className="absolute bottom-6 left-6 right-6">
            <Link
              to="/settings"
              className="flex items-center gap-4 p-4 text-white hover:bg-white/20 rounded-xl transition-all duration-200 text-base font-medium backdrop-blur-sm group"
              onClick={() => setOpen(false)}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <FaCog className="w-4 h-4 text-white" />
              </div>
              Settings
            </Link>
          </div>
        )}
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}
