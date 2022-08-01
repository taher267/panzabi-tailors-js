import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ExpressProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return "Loading...";
  if (!loading && user?.accessToken) return <Outlet>{children}</Outlet>;
  return <Navigate to="/login" />;
};

export default ExpressProtectedRoute;

// export const ProtectedRouteV5 = ({ component:Component, ...rest }) => {
//     return <Router {...rest}>{(props)=><Component {...props}/>}</Router>
//   };
