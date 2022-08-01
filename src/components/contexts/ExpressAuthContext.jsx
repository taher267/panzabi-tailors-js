import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export default function ExpressAuthProvider({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState();

  /**
   *
   * @param {string} email
   * @param {string} password
   * @param {string} username
   * @return {object}
   */
  async function signup(email, password, username) {}
  /**
   *
   * @param {string} email
   * @param {string} password
   */
  async function login(email, password) {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5001/api/v1/login`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const { success, user: id, token, message } = await response.json();
      setLoading(false);
      if (success) {
        // setCurrentUser(id);
        // return { success };
        Cookies.set("testToken", token);
        return await loadUser(token);
      }
      setError(message);
      return { success, message };
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  }
  //Load user
  async function loadUser() {
    try {
      setLoading(true);
      const token = Cookies.get("testToken");
      if (token) {
        const response = await fetch(`http://localhost:5001/api/v1/me`, {
          method: "GET",
          mode: "cors",
          headers: { Authentication: `Bearer ${token}` },
        });
        const { success, message, user } = await response.json();

        if (success && user) {
          setCurrentUser({ ...user });
          setLoading(false);
          return {
            success,
            user,
          };
        }
        setError(message);
        return { success, message };
      } else {
        return { success: false };
      }
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  }
  async function logout(redirectTo) {
    setLoading(true);
    Cookies.remove("testToken");
    setCurrentUser(null);
    setLoading(false);
    return navigate(redirectTo || "/");
  }

  const value = {
    isLoading: loading,
    currentUser,
    signup,
    login,
    logout,
    error,
  };
  useEffect(() => {
    const unsubscribe = (async function tryUser() {
      if (!currentUser && Cookies.get("testToken")) {
        setLoading(true);
        await loadUser();
      }
      return () => unsubscribe;
    })();
  });
  if (loading) return <div>Loading</div>;

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useExpressAuth = () => useContext(AuthContext);
