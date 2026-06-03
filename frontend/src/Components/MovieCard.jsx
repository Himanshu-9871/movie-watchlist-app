function MovieCard({ movie, onToggle, onDelete }) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-2xl border shadow-sm transition ${
        movie.watched
          ? "bg-white/25 border-white/30 opacity-70"
          : "bg-white/40 border-white/50"
      }`}
    >
      <div className="w-12 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-sky-100 flex items-center justify-center">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-2xl">🎬</span>
        )}
      </div>

      <div className="flex-1">
        <p
          className={`font-semibold text-slate-800 text-lg ${
            movie.watched ? "line-through text-slate-400" : ""
          }`}
        >
          {movie.title}
        </p>
        <p className="text-sm text-slate-400">
          {movie.watched ? "Watched ✓" : "Not watched yet"}
        </p>
      </div>

      <button
        onClick={() => onToggle(movie.id, movie.watched)}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition hover:scale-105 ${
          movie.watched
            ? "bg-white/50 border border-gray-200 text-slate-600 hover:bg-white/70"
            : "bg-sky-500 text-white hover:bg-sky-600"
        }`}
      >
        {movie.watched ? "Unwatch" : "Mark Watched"}
      </button>

      <button
        onClick={() => onDelete(movie.id)}
        className="px-3 py-2 rounded-xl text-sm font-medium bg-red-100 text-red-500 hover:bg-red-200 hover:scale-105 transition"
      >
        🗑️
      </button>
    </div>
  );
}

export default MovieCard;
