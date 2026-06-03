import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import MovieCard from "../Components/MovieCard";

function WatchList() {
  const navigate = useNavigate();

  // All movies in the watchlist from DB
  const [movies, setMovies] = useState([]);

  // For the "Add Movie" form
  const [newMovie, setNewMovie] = useState({
    movie_id: "",
    title: "",
    poster: "",
  });

  // Loading state
  const [loading, setLoading] = useState(true);

  // Fetch watchlist from backend when page loads
  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const res = await api.get("/watchlist");
      setMovies(res.data);
    } catch (error) {
      console.log(error);
      // If not logged in, go to login page
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const isPosterUrlValid = (value) => {
    if (!value) return true;
    const trimmed = value.trim();
    if (!trimmed) return true;
    if (trimmed.startsWith("data:")) return false;
    if (trimmed.length > 255) return false;
    return true;
  };

  // Add a new movie to the watchlist
  const handleAdd = async (e) => {
    e.preventDefault();

    const title = newMovie.title.trim();
    const poster = newMovie.poster.trim();
    const movie_id = newMovie.movie_id.trim();

    if (!title) {
      return alert("Movie title is required.");
    }

    if (!isPosterUrlValid(poster)) {
      return alert(
        "Please enter a valid poster URL. Do not paste base64 data or extremely long strings.",
      );
    }

    const payload = {
      movie_id: movie_id || null,
      title,
      poster: poster || null,
    };

    try {
      const res = await api.post("/watchlist", payload);
      // Add the new movie to the list without re-fetching
      setMovies([...movies, res.data]);
      // Clear the form
      setNewMovie({ movie_id: "", title: "", poster: "" });
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Could not add movie");
    }
  };

  // Toggle watched / unwatched
  const handleToggleWatched = async (id, currentStatus) => {
    try {
      await api.put(`/watchlist/${id}`, { watched: !currentStatus });
      // Update only that movie in the list
      setMovies(
        movies.map((m) =>
          m.id === id ? { ...m, watched: !currentStatus } : m,
        ),
      );
    } catch (error) {
      console.log(error);
      alert("Could not update movie");
    }
  };

  // Delete a movie from watchlist
  const handleDelete = async (id) => {
    try {
      await api.delete(`/watchlist/${id}`);
      // Remove from list
      setMovies(movies.filter((m) => m.id !== id));
    } catch (error) {
      console.log(error);
      alert("Could not delete movie");
    }
  };

  // Separate into watched and unwatched
  const unwatched = movies.filter((m) => !m.watched);
  const watched = movies.filter((m) => m.watched);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-white flex items-center justify-center">
        <div className="text-2xl text-slate-600">Loading your watchlist...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-white">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-slate-800 mb-2">My Watchlist</h1>
        <p className="text-slate-500 mb-8">
          {movies.length === 0
            ? "Your watchlist is empty. Add a movie below!"
            : `${unwatched.length} to watch · ${watched.length} watched`}
        </p>

        {/* Add Movie Form */}
        <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl shadow-lg p-6 mb-10">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            ➕ Add a Movie
          </h2>

          <form
            onSubmit={handleAdd}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              placeholder="Movie title"
              value={newMovie.title}
              onChange={(e) =>
                setNewMovie({ ...newMovie, title: e.target.value })
              }
              required
              className="flex-1 px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            />
            <input
              type="text"
              placeholder="Poster URL (optional)"
              value={newMovie.poster}
              onChange={(e) =>
                setNewMovie({ ...newMovie, poster: e.target.value })
              }
              className="flex-1 px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 hover:scale-105 transition"
            >
              Add
            </button>
          </form>
        </div>

        {/* To Watch List */}
        {unwatched.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              🎯 To Watch ({unwatched.length})
            </h2>

            <div className="flex flex-col gap-3">
              {unwatched.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onToggle={handleToggleWatched}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}

        {/* Watched List */}
        {watched.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              ✅ Watched ({watched.length})
            </h2>

            <div className="flex flex-col gap-3">
              {watched.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onToggle={handleToggleWatched}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {movies.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-xl">No movies yet. Add your first one above!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchList;
