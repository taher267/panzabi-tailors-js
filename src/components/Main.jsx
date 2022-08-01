import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import AuthProvider from "./contexts/AuthContext";
import Home from "./Pages/public/Home";
import Signup from "./Pages/public/Signup";
// import Login from "./Pages/public/Login";
// import Nav from "./Pages/public/Nav";
import Nav2 from "./Pages/public/Nav2";
import Dashbard from "./Pages/protected/Dashboard";
import ProtectedRoute from "./Pages/protected/ProtectedRoute";
import ExpressAuthProvider from "./contexts/ExpressAuthContext";
import Login2 from "./Pages/public/Login2";

export default function Main() {
  return (
    <Router>
      <ExpressAuthProvider>
        <Nav2 />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login2" element={<Login2 />} />
          {/* <Route element={<ProtectedRoute>Something</ProtectedRoute>}> */}
          <Route path="dashboard" element={<Dashbard />} />
          {/* </Route> */}
        </Routes>
      </ExpressAuthProvider>
      {/* <AuthProvider>
        <Nav />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute>Something</ProtectedRoute>}>
            <Route path="dashboard" element={<Dashbard />} />
          </Route>
        </Routes>
      </AuthProvider> */}
    </Router>
  );
}
