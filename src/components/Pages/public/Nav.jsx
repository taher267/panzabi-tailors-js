import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Button from "../../CustomTag/Button.jsx";
export default function Nav() {
  const navagate = useNavigate();
  const { user, logout } = useAuth();
  const logoutReq = async () => {
    try {
      await logout();
      navagate("/login");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <>
      <ul style={{ display: "flex", gap: "2vw", listStyle: "none" }}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {user?.accessToken ? (
          <>
            <li>
              {user?.displayName && <span>{user?.displayName}</span>}{" "}
              <Button onClick={logoutReq} text="logout" />
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        )}
      </ul>
    </>
  );
}
