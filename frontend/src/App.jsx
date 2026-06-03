import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import WatchList from "./Pages/WatchList";
import NavBar from "./Components/NavBar";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const location = useLocation();
  const hideNav = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideNav && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <WatchList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
