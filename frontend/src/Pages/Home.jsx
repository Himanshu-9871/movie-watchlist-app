import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-24">
        <div className="text-6xl mb-6">🍿</div>

        <h1 className="text-5xl font-bold text-slate-800 mb-4">
          Your Personal Movie Tracker
        </h1>

        <p className="text-xl text-slate-600 max-w-xl mb-10">
          Save movies you want to watch, mark them as watched, and never forget
          a great recommendation again.
        </p>

        <div className="flex gap-4">
          <Link
            to="/register"
            className="px-8 py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 hover:scale-105 transition"
          >
            Get Started — It's Free
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 rounded-xl bg-white/50 border border-white/60 text-slate-700 font-semibold hover:bg-white/70 hover:scale-105 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
          Everything you need
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-8 text-center shadow-lg hover:scale-105 transition">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Find Movies
            </h3>
            <p className="text-slate-600">
              Search from thousands of movies and add them to your personal
              list.
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-8 text-center shadow-lg hover:scale-105 transition">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Build Your List
            </h3>
            <p className="text-slate-600">
              Organize what you want to watch and keep track of everything in
              one place.
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-8 text-center shadow-lg hover:scale-105 transition">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Mark as Watched
            </h3>
            <p className="text-slate-600">
              Tick off movies once you've seen them and see your progress grow.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-8 py-16 text-center">
        <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-12 max-w-2xl mx-auto shadow-lg">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Ready to start watching?
          </h2>
          <p className="text-slate-600 mb-8">
            Join thousands of movie lovers tracking their watchlist.
          </p>
          <Link
            to="/register"
            className="px-8 py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 hover:scale-105 transition"
          >
            Create Your Watchlist
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-slate-500 text-sm border-t border-white/30">
        © 2024 MovieWatchlist · Made with ❤️
      </footer>
    </div>
  );
}

export default Home;
