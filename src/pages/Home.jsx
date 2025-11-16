import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AOS from "aos";
import gsap from "gsap";

export default function Home() {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [email, setEmail] = useState("");

  const toggleFAQ = (i) => setActiveFAQ(activeFAQ === i ? null : i);

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail("");
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out-cubic",
      once: true,
    });

    gsap.from(".hero-title", {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: "power3.out",
    });
    gsap.from(".hero-subtext", {
      opacity: 0,
      y: 30,
      delay: 0.5,
      duration: 1.2,
    });
    gsap.from(".hero-buttons", {
      opacity: 0,
      y: 20,
      delay: 0.8,
      stagger: 0.2,
    });
  }, []);

  return (
    <div className="space-y-28 md:space-y-32 lg:space-y-36 pb-20">
      {/* HERO - Enhanced Video Background */}
      <section className="relative h-screen min-h-[700px] overflow-hidden rounded-none md:rounded-3xl shadow-2xl">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/3183862/3183862-sd_640_360_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 flex flex-col justify-center items-center text-center px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="hero-title text-white font-black text-5xl md:text-7xl lg:text-8xl leading-tight mb-6">
              Unlock Your Future With{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Top-Tier Courses
              </span>{" "}
              🚀
            </h1>
            <p className="hero-subtext text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-10">
              Learn in-demand skills that help you earn, grow & stand out in the
              competitive digital world.
            </p>
            <div className="hero-buttons flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link
                to="/courses"
                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-2xl hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Explore All Courses
              </Link>
              <Link
                to="/signup"
                className="px-10 py-5 border-2 border-white text-white text-lg font-bold rounded-2xl hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
              >
                Start Learning Free
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* CATEGORIES - Enhanced */}
      <section data-aos="fade-up" className="px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Choose Your Learning Path 🎯
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Discover courses across cutting-edge technologies and high-demand
            skills
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Web Development",
              icon: "🌐",
              color: "bg-gradient-to-r from-blue-500 to-cyan-500",
            },
            {
              name: "Mobile Development",
              icon: "📱",
              color: "bg-gradient-to-r from-green-500 to-emerald-500",
            },
            {
              name: "AI & Machine Learning",
              icon: "🤖",
              color: "bg-gradient-to-r from-purple-500 to-pink-500",
            },
            {
              name: "Data Science",
              icon: "📊",
              color: "bg-gradient-to-r from-orange-500 to-red-500",
            },
            {
              name: "UI/UX Design",
              icon: "🎨",
              color: "bg-gradient-to-r from-pink-500 to-rose-500",
            },
            {
              name: "Cybersecurity",
              icon: "🔒",
              color: "bg-gradient-to-r from-red-500 to-orange-500",
            },
            {
              name: "Blockchain",
              icon: "⛓️",
              color: "bg-gradient-to-r from-gray-700 to-gray-900",
            },
            {
              name: "Business & Marketing",
              icon: "💼",
              color: "bg-gradient-to-r from-yellow-500 to-amber-500",
            },
          ].map((cat, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 cursor-pointer"
              data-aos="zoom-in"
              data-aos-delay={i * 100}
            >
              <div
                className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {cat.icon}
              </div>
              <h3 className="font-bold text-xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                {cat.name}
              </h3>
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300 blur-sm group-hover:blur-md"></div>
            </div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENT STATS - Enhanced */}
      <section
        data-aos="fade-up"
        className="relative py-24 px-6 text-white overflow-hidden rounded-3xl mx-6"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            We Don't Just Teach.
            <br />
            We Transform Careers.
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-16">
            Join thousands of students who've transformed their careers with our
            industry-leading courses
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 font-bold">
            {[
              { number: "15,000+", label: "Active Students" },
              { number: "4.9⭐", label: "Average Rating" },
              { number: "120+", label: "Countries Worldwide" },
              { number: "98%", label: "Career Success Rate" },
            ].map((stat, i) => (
              <div key={i} data-aos="zoom-in" data-aos-delay={i * 200}>
                <div className="text-4xl md:text-5xl font-black mb-2">
                  {stat.number}
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTRUCTORS - Enhanced */}
      <section data-aos="fade-up" className="px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Learn From Industry Experts 👨‍🏫
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Our instructors are seasoned professionals with real-world
            experience
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {[
            {
              name: "Sarah Johnson",
              role: "Senior Full-Stack Developer",
              exp: "12+ Years",
              students: "8,500+",
              company: "Ex-Google",
            },
            {
              name: "Mike Chen",
              role: "AI Research Scientist",
              exp: "10+ Years",
              students: "6,200+",
              company: "Ex-OpenAI",
            },
            {
              name: "Emily Rodriguez",
              role: "Lead UX Designer",
              exp: "8+ Years",
              students: "5,800+",
              company: "Ex-Meta",
            },
          ].map((instructor, i) => (
            <div
              key={i}
              className="group text-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100"
              data-aos="zoom-in"
              data-aos-delay={i * 200}
            >
              <div className="relative inline-block">
                <img
                  src={`https://i.pravatar.cc/200?img=${i + 10}`}
                  className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                  alt={instructor.name}
                />
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
              </div>
              <h3 className="mt-6 font-black text-2xl text-gray-800">
                {instructor.name}
              </h3>
              <p className="text-blue-600 font-semibold mt-2">
                {instructor.role}
              </p>
              <p className="text-gray-600 mt-2">
                {instructor.company} • {instructor.exp} Experience
              </p>
              <div className="mt-4 bg-gray-50 rounded-2xl p-4">
                <p className="text-sm text-gray-600">
                  {instructor.students} Students Taught
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATE - Enhanced */}
      <section data-aos="fade-up" className="px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl p-12 text-center border border-gray-200">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Earn Industry-Recognized Certificates 🎖️
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-10">
            Showcase your achievements on LinkedIn, resumes, and portfolios with
            our verified digital certificates
          </p>
          <div className="relative max-w-4xl mx-auto">
            <img
              src="../../public/fakecerti.png"
              alt="Professional Certificate"
              className="w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 cursor-pointer border-8 border-white"
            />
            <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-lg">
              Verified & Shareable
            </div>
          </div>
        </div>
      </section>

      {/* FAQs - Enhanced */}
      <section className="px-6 max-w-4xl mx-auto" data-aos="fade-up">
        <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-200">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              [
                "Is it lifetime access?",
                "Yes! Once you purchase a course, you get lifetime access to all current and future content updates. Learn at your own pace forever.",
              ],
              [
                "Do I get certificates for courses?",
                "Absolutely! Each completed course comes with a downloadable, verifiable certificate that you can share on LinkedIn and other professional platforms.",
              ],
              [
                "What's your refund policy?",
                "We offer a 100% no-questions-asked refund within 7 days of purchase if you're not completely satisfied with your learning experience.",
              ],
              [
                "Are there any prerequisites?",
                "Most beginner courses require no prior knowledge. Advanced courses will clearly list any prerequisites so you can choose appropriately.",
              ],
              [
                "Can I download course content?",
                "Yes, most course materials including videos, code files, and resources are available for download for offline learning.",
              ],
            ].map(([q, a], i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500"
              >
                <div
                  className="p-6 cursor-pointer flex justify-between items-center bg-gray-50 hover:bg-blue-50 transition-colors duration-300"
                  onClick={() => toggleFAQ(i)}
                >
                  <h3 className="font-bold text-xl text-gray-800 pr-4">{q}</h3>
                  <span className="text-2xl font-light text-blue-600 min-w-8 text-center">
                    {activeFAQ === i ? "−" : "+"}
                  </span>
                </div>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    activeFAQ === i
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 pt-2 text-gray-600 text-lg leading-relaxed">
                    {a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER - Enhanced */}
      <section data-aos="fade-up" className="px-6 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Get Free Learning Resources & Updates 💌
          </h2>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Join 10,000+ learners who receive exclusive tips, course updates,
            and free resources every week
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-2xl border-0 text-gray-800 text-lg focus:ring-4 ring-blue-300 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="px-10 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg text-lg"
            >
              Subscribe Now
            </button>
          </form>
          <p className="text-blue-200 text-sm mt-4">
            No spam ever. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* FOOTER - Enhanced */}
      <footer
        className="bg-gray-900 text-white rounded-3xl mx-6 overflow-hidden"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <h3 className="font-black text-3xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                CourseStore
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Empowering learners worldwide with industry-relevant skills and
                career-transforming education.
              </p>
              <div className="flex gap-4 mt-6">
                {["Twitter", "LinkedIn", "YouTube", "Instagram"].map(
                  (social) => (
                    <div
                      key={social}
                      className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors"
                    >
                      {social.slice(0, 2)}
                    </div>
                  )
                )}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-6">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                {[
                  "All Courses",
                  "Become Instructor",
                  "About Us",
                  "Success Stories",
                ].map((link) => (
                  <li
                    key={link}
                    className="hover:text-white cursor-pointer transition-colors"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-6">Support</h4>
              <ul className="space-y-3 text-gray-400">
                {[
                  "Help Center",
                  "Contact Us",
                  "Privacy Policy",
                  "Terms of Service",
                ].map((link) => (
                  <li
                    key={link}
                    className="hover:text-white cursor-pointer transition-colors"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>
              © {new Date().getFullYear()} CourseStore. All rights reserved. |
              Learn • Grow • Achieve
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
