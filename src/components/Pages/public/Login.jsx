import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../CustomTag/Button";
import CustomInput from "../../CustomTag/CustomInput";

export default function Login() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  async function submitHandle(e) {
    e.preventDefault();

    const { email, password } = loginInfo;

    if (email && password) {
      try {
        setError("");
        setLoading(true);
        await login(email, password);
        navigate("/profile");
      } catch ({ message }) {
        setLoading(false);
        setError(message);
      }
    }
  }

  function inputHander({ target: { name, value } }) {
    setLoginInfo((p) => ({ ...p, [name]: value }));
  }

  useEffect(() => {
    if (user?.accessToken) return navigate("/profile");
  }, [user?.accessToken, navigate]);

  return (
    <form onSubmit={submitHandle}>
      <h3>SignIn</h3>
      <br />
      {error && <div>{error}</div>}
      <hr />
      <CustomInput
        name="email"
        type="email"
        value={loginInfo.email}
        onChange={inputHander}
        label={{ className: "label", text: "Email Address" }}
        placeholder="Enter Email Address"
      />
      <hr />
      <CustomInput
        name="password"
        type="password"
        value={loginInfo.password}
        onChange={inputHander}
        label={{ className: "label", text: "Password" }}
        placeholder="Enter Password"
      />
      <hr />
      <Button type="submit" disabled={loading} text="Login" />
    </form>
  );
}
