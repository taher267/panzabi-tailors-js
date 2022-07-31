import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import Home from "./Pages/public/Home";
import Signup from "./Pages/public/Signup";
import Login from "./Pages/public/Login";

export default function Main() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
