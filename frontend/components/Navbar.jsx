import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/analyze?region=${query}`);
    }
  };

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50">
      <nav className="flex justify-between items-center px-8 py-3 rounded-2xl 
                      bg-white/10 backdrop-blur-lg border border-white/20 
                      text-white shadow-xl">

        {/* Logo */}
        <h1
          className="text-lg font-semibold cursor-pointer hover:text-green-400 transition"
          onClick={() => navigate("/")}
        >
          Forester
        </h1>

        {/* Links */}
        <div className="flex gap-8 text-sm">
          <Link to="/heatmap" className="hover:text-green-400 transition">
            Global Risk Map
          </Link>
          <Link to="/analyze" className="hover:text-green-400 transition">
            Regional Analysis
          </Link>
          <Link to="/chatbot" className="hover:text-green-400 transition">
            Advisory AI
          </Link>
        </div>

        {/* Search + CTA */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search region..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-1 rounded-md bg-white/20 text-sm outline-none placeholder-gray-300"
          />
          <button
            onClick={handleSearch}
            className="px-3 py-1 bg-white/20 rounded-md hover:bg-white/30 transition text-sm"
          >
            Search
          </button>
          <button
            onClick={() => navigate("/analyze")}
            className="px-4 py-1 bg-green-600 rounded-md hover:bg-green-500 transition"
          >
            Get Started
          </button>
        </div>

      </nav>
    </div>
  );
}

export default Navbar;
