import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Offerings from "./pages/Offerings";
// import Preachings from "./pages/Preachings";
import Navbar from "./components/Navbar";
import Cards from "./pages/Cards";
// import Services from "./pages/Services";

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<Cards />} />
          {/* <Route path="/offerings" element={<Offerings />} /> */}
          {/* <Route path="/preachings" element={<Preachings />} /> */}
        </Routes>
      </Router>
  );
}

export default App;
