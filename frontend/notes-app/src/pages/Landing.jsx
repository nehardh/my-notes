import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-30 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-400/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <header className="flex justify-between items-center px-5 sm:px-8 py-4 sm:py-5 backdrop-blur-md bg-white/70 border-b border-gray-200 sticky top-0 z-50">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl font-semibold tracking-tight text-blue-700"
        >
          MyNotes
        </motion.h1>

        <nav className="flex gap-2 sm:gap-3">
          <Link
            to="/login"
            className="px-4 sm:px-5 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 transition"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-blue-700 text-white px-4 sm:px-5 py-2 rounded-lg font-medium text-sm hover:bg-blue-800 transition-all"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-5 sm:px-6 py-20 sm:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-5 sm:mb-6 leading-tight tracking-tight"
        >
          Capture your thoughts.  
          <br className="hidden sm:block" />
          <span className="text-blue-700">Organize your life.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-600 max-w-lg mb-10 text-base sm:text-lg px-2 sm:px-0"
        >
          A clean, distraction-free notes and tasks app — built to help you
          focus, think, and create.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            to="/signup"
            className="bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-blue-800 transition-all shadow-sm hover:shadow-md w-full sm:w-auto"
          >
            Start Writing
          </Link>
          <a
            href="#features"
            className="text-blue-700 border border-blue-700 px-8 py-3 rounded-xl text-lg font-medium hover:bg-blue-50 transition-all w-full sm:w-auto"
          >
            Learn More
          </a>
        </motion.div>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className="bg-white py-16 sm:py-30 px-5 sm:px-6"
      >
        <div className="max-w-6xl mx-auto text-center mb-12 sm:mb-14">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">
            Designed for clarity and flow
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            MyNotes is where ideas, plans, and tasks live together. 
            Seamlessly switch between thinking and doing.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Instant & Secure",
              desc: "Your notes save instantly and sync securely across devices.",
            },
            {
              title: "Smart Organization",
              desc: "Use tags, filters, and folders that grow with your workflow.",
            },
            {
              title: "Seamless Tasks",
              desc: "Turn any note into a checklist in one click.",
            },
            {
              title: "Dark Mode Ready",
              desc: "Comfortable experience day or night.",
            },
            {
              title: "Minimal by Design",
              desc: "No clutter. Just focus and flow.",
            },
            {
              title: "Cross-Device Sync",
              desc: "Your workspace follows you everywhere.",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md hover:bg-white transition-all"
            >
              <h4 className="text-lg sm:text-xl font-semibold text-blue-700 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm sm:text-base">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 text-center bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white px-5">
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-5 sm:mb-6"
        >
          Your ideas deserve better.
        </motion.h3>
        <p className="text-blue-100 mb-8 max-w-md mx-auto text-base sm:text-lg">
          Create, organize, and complete — all in one elegant workspace.
        </p>
        <Link
          to="/signup"
          className="bg-white text-blue-700 px-8 py-3 rounded-xl text-base sm:text-lg font-semibold hover:bg-blue-50 transition-all shadow-md"
        >
          Get Started for Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-6 text-center text-xs sm:text-sm text-gray-500">
        © {new Date().getFullYear()} MyNotes —  by{" "}
        <span className="font-medium text-gray-700">Nehardh</span>.
      </footer>
    </div>
  );
};

export default Landing;
