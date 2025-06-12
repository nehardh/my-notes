import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 shadow-md">
        <h1 className="text-2xl font-bold text-blue-700">MyNotes</h1>
        <nav className="flex gap-4">
          <Link to="/login" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600">Login</Link>
          <Link to="/signup" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">Sign Up</Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-4 py-12">
        <h2 className="text-4xl font-bold mb-4 text-slate-800">Capture your thoughts, organize your life.</h2>
        <p className="text-gray-600 max-w-md mb-6">
          A powerful and minimal notes app to boost your productivity and keep everything in one place.
        </p>
        <div className="flex gap-4">
          <Link to="/signup" className="bg-blue-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-800">
            Get Started
          </Link>
          <a href="#features" className="text-blue-700 border border-blue-700 px-6 py-3 rounded-lg text-lg hover:bg-blue-50">
            Learn More
          </a>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="bg-gray-100 py-12 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-700">Fast & Secure</h3>
            <p className="text-gray-600">Your notes are safely stored and instantly accessible.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-700">Tag Based</h3>
            <p className="text-gray-600">Organize your thoughts with hashtags and filters.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-700">Mobile Ready</h3>
            <p className="text-gray-600">Responsive design to access your notes anywhere.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MyNotes. Built with ❤️ by Nehardh.
      </footer>
    </div>
  )
}

export default Landing
