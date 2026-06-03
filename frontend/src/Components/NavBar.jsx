import { Link, useLocation, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const isActive = (path) =>
    location.pathname === path
      ? "text-slate-900 font-semibold"
      : "text-slate-600 hover:text-slate-900";

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Are Sure you want to logout?");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight"
        >
          🎬 MovieWatchlist
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/"
            className={isActive("/") + " rounded-full px-4 py-2 transition"}
          >
            Home
          </Link>
          {token && (
            <Link
              to="/watchlist"
              className={
                isActive("/watchlist") + " rounded-full px-4 py-2 transition"
              }
            >
              Watchlist
            </Link>
          )}
          {!token ? (
            <>
              <Link
                to="/login"
                className={
                  isActive("/login") +
                  " rounded-full px-4 py-2 transition bg-slate-100"
                }
              >
                Login
              </Link>
              <Link
                to="/register"
                className={
                  isActive("/register") +
                  " rounded-full px-4 py-2 transition bg-slate-900 text-white"
                }
              >
                Register
              </Link>
            </>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
