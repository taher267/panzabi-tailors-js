import { NavLink, useNavigate } from "react-router-dom";
import { useExpressAuth } from "../../contexts/ExpressAuthContext.jsx";
import Button from "../../CustomTag/Button.jsx";
export default function Nav() {
  const { logout, currentUser } = useExpressAuth();
  const logoutReq = async () => logout();
  return (
    <>
      <ul style={{ display: "flex", gap: "2vw", listStyle: "none" }}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {currentUser?.email ? (
          <li>
            <Button onClick={logoutReq} text="logout" />
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/signup2">Signup</NavLink>
            </li>
            <li>
              <NavLink to="/login2">Login</NavLink>
            </li>
          </>
        )}
      </ul>
    </>
  );
}
