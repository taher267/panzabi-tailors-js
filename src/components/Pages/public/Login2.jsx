import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExpressAuth } from "../../contexts/ExpressAuthContext";
import Button from "../../CustomTag/Button";
import CustomInput from "../../CustomTag/CustomInput";

export default function Login2() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [loginInfo, setLoginInfo] = useState({
    email: "abutaher267@gmail.com",
    password: "12345678",
  });

  const { login, isLoading, currentUser } = useExpressAuth();

  async function submitHandle(e) {
    e.preventDefault();

    const { email, password } = loginInfo;

    if (email && password) {
      try {
        setError("");
        setLoading(true);
        const { success, message } = await login(email, password);
        setLoading(false);
        if (success) return navigate("/profile");
        return setError();
      } catch (err) {
        console.log(err);
      }
    }
  }

  function inputHander({ target: { name, value } }) {
    setLoginInfo((p) => ({ ...p, [name]: value }));
  }

  useEffect(() => {
    if (currentUser?.email) return navigate("/dashboard");
  }, [currentUser]);

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
