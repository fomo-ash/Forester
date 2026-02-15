import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import Advisory from "./pages/Advisory";
import GlobalMap from "./pages/Heatmap";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/chatbot" element={<Advisory />} />
        <Route path="/heatmap" element={<GlobalMap />} />
      </Routes>
    </Router>
  );
}

export default App;
