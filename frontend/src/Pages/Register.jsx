import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /*
spread opertor just seperates the form data
only the email changes
{
  name: "Himanshu",
  email: "abc@gmail.com",
  password: ""
  }
  
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const res = await api.post("/auth/register", formData);
      alert(res.data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
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
      bg-gradient-to-b
      from-sky-200
      via-sky-100
      to-white
      relative
      overflow-hidden
    "
    >
      <div
        className="
        relative
        w-[420px]
        bg-white/40
        border
        border-white/50
        rounded-3xl
        shadow-2xl
        p-8
      "
      >
        <div className="flex justify-center mb-4">
          <div
            className="
            h-14
            w-14
            rounded-xl
            bg-white
            shadow-md
            flex
            items-center
            justify-center
            text-xl
            "
          >
            🎬
          </div>
        </div>

        <h1
          className="
        text-3xl
        font-semibold
        text-center
        text-gray-800
        "
        >
          Create Account
        </h1>

        <p
          className="
        text-center
        text-gray-600
        font-medium
        mt-2
        mb-8
        
        "
        >
          Start Building Your Personalized Watchlist
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="
        w-full
        mb-4
        px-4
        py-3
        rounder-xl
        bg-white/50
        border
        border-gray-200
        hover:scale-[1.02]
        transition
        outline-node
        focus:outline-none      
        "
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="
        w-full
        mb-4
        px-4
        py-3
        rounder-xl
        bg-white/50
        hover:scale-[1.02]
        transition
        border
        border-gray-200
        outline-node
        focus:outline-none      
        "
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="
        w-full
        mb-6
        px-4
        py-3
        rounder-xl
        bg-white/50
        border
        border-gray-200
        hover:scale-[1.02]
        transition
        outline-node
        focus:outline-none      
        "
          />

          <button
            type="submit"
            className="
        w-full
        py-3
        rounded-xl
        bg-slate-900
        text-white
        font-medium
        hover:scale-[1.02]
        transition
        
        "
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <p
          className="
        text-center

        "
        >
          Already Have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-slate-900 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

//  {/* Login Link */}
//         <p className="text-center mt-6 text-gray-700">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="font-semibold text-slate-900 hover:underline"
//           >
//             Login
//           </Link>
//         </p>

// {/* Button */}
//         <button
//           className="
//           w-full
//           py-3
//           rounded-xl
//           bg-slate-900
//           text-white
//           font-medium
//           hover:scale-[1.02]
//           transition
//         "
//         >
//           Create Account
//         </button>

//           bg-white/60
//           border
//           border-gray-200
//           outline-none
//           focus:ring-2
//           focus:ring-sky-400

//  {/* Icon */}
//         <div className="flex justify-center mb-4">
//           <div
//             className="
//             h-14
//             w-14
//             rounded-xl
//             bg-white
//             shadow-md
//             flex
//             items-center
//             justify-center
//             text-xl
//           "
//           >
//             🎬
//           </div>
// w-[420px]
//         bg-white/40   - white color with 40 opacity
//         backdrop-blur-xl
//         border
//         border-white/50
//         rounded-3xl
//         shadow-2xl
//         p-8
