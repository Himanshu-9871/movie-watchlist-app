import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import loginIcon from "../images/user.png";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  //useState what happens when state changes
  //formData -> initial then changes will occur in this formData and who will do the changes setFormData
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //add what happens when state changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", formData);
      alert(res.data.message); //ye msg backend se aa rha h

      //storing token backend is sending in local storage
      localStorage.setItem("token", res.data.token);
      /**
      Now even after:Refresh Close tab Reopen browser the token is still available.
     */
      setFormData({
        email: "",
        password: "",
      });
      navigate("/watchlist");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-t
      from-cyan-100
      via-sky-200
      to-cyan-300
      px-4
    "
    >
      {/* Login Card */}
      <div
        className="
        w-full
        max-w-md
        bg-white/30
        backdrop-blur-xl
        border
        border-white/40
        rounded-3xl
        shadow-2xl
        p-8
      "
      >
        {/* Logo */}
        <div
          className="
          w-16
          h-16
          mx-auto
          rounded-2xl
          bg-cyan
          flex
          items-center
          justify-center
          shadow-lg
        "
        >
          <img src={loginIcon} alt="Login" className="h-8 w-8" />
        </div>

        {/* Heading */}
        <h1
          className="
          text-center
          text-3xl
          font-extrabold
          text-slate-800
          mt-5
        "
        >
          Welcome Back
        </h1>

        <p
          className="
          text-center
          text-slate-600
          mt-2
          mb-6
        "
        >
          Discover, Save, and Watch Your Favorite Movies.
        </p>

        <h2
          className="
          text-center
          text-xl
          font-semibold
          text-slate-700
          mb-6
        "
        >
          Sign in with Email
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label
              className="
              block
              text-sm
              font-medium
              text-slate-700
              mb-2
            "
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email} //"Whatever is inside formData.email, show it inside the input box."
              onChange={handleChange} //Whenever the user types something, run handleChange.
              placeholder="Enter your email"
              required
              className="
              w-full
              px-4
              py-3
              rounded-xl
              bg-white/50
              border
              border-white/50
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-400
              transition-all
              duration-300
            "
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="
              block
              text-sm
              font-medium
              text-slate-700
              mb-2
            "
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="
              w-full
              px-4
              py-3
              rounded-xl
              bg-white/50
              border
              border-white/50
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-400
              transition-all
              duration-300
            "
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="
              text-sm
              text-cyan-700
              hover:underline
            "
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="
            w-full
            py-3
            rounded-xl
            bg-cyan-600
            text-white
            font-semibold
            shadow-lg
            hover:bg-cyan-700
            hover:scale-[1.02]
            transition-all
            duration-300
          "
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p
          className="
          text-center
          text-sm
          text-slate-600
          mt-6
        "
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
            text-cyan-700
            font-semibold
            hover:underline
          "
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
