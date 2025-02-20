import Navbar from './components/Navbar'
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AuthCallback from "./pages/AuthCallback";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/home" element={<HomePage />} />
          </Routes>
      </Router>
    )
}

export default App
