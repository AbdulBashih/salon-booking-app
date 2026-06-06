import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./views/LandingPage";
import BookingFlow from "./views/BookingFlow";
import AdminDashboard from "./views/AdminDashboard";

function App() {
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/book" element={<BookingFlow />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
