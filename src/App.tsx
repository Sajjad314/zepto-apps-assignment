// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import Home from "./pages/Home.page";
import Wishlist from "./pages/WishList.page";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  );
};

export default App;
