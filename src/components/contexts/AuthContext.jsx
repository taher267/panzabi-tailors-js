import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import "../../firabase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  // const [error, setError] = useState();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  /**
   *
   * @param {string} email
   * @param {string} password
   * @param {string} username
   * @return {object}
   */
  async function signup(email, password, username) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
    //Update Profile
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    //set user

    const newUser = auth.currentUser;
    setUser({ ...newUser });
  }
  /**
   *
   * @param {string} email
   * @param {string} password
   */
  function login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }
  async function logout() {
    const auth = getAuth();
    return signOut(auth);
  }

  const value = { user, signup, login, logout, loading };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
