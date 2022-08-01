import CustomInput from "./../../CustomTag/CustomInput";
import { useState, useEffect } from "react";
import Button from "../../CustomTag/Button";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const H1 = styled.h1`
  color: #009dea;
  border-bottom: 1px solid #009dea;
  padding-bottom: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 35vw;
  margin: auto;
  height: 90vh;
  gap: 2vh;
`;

export default function Signup() {
  const navigate = useNavigate();
  const { signup, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [showPass, setShowPass] = useState("password");
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, username, email } = signupInfo;
    if (password !== "" && password === confirmPassword) {
      try {
        setError("");
        setLoading(true);
        await signup(email, password, username);
        setLoading(false);
        navigate("/profile");
      } catch ({ message }) {
        setLoading(false);
        setError(message);
      }
    } else {
      setShowPass("text");
      setTimeout(() => setShowPass("password"), 3000);
      window.alert(`Passord doesn't match!`);
    }
  };
  const inputHander = ({ target: { value, name } }) =>
    setSignupInfo((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    document.querySelector("form input").focus();
    if (user?.accessToken) return navigate("/profile");
  }, [user?.accessToken, navigate]);
  return (
    <>
      <Form onSubmit={submitHandler}>
        <H1>Signup</H1>
        {error && <div>{error}</div>}
        <CustomInput
          name="username"
          value={signupInfo.username}
          onChange={inputHander}
          label={{ className: "label", text: "Username" }}
          placeholder="Enter Username"
        />
        <hr />
        <CustomInput
          name="email"
          type="email"
          value={signupInfo.email}
          onChange={inputHander}
          label={{ className: "label", text: "Email Address" }}
          placeholder="Enter Email Address"
        />

        <hr />
        <CustomInput
          name="password"
          type={showPass}
          value={signupInfo.password}
          onChange={inputHander}
          label={{ className: "label", text: "Passowrd" }}
          placeholder="Enter New Password"
        />
        <hr />
        <CustomInput
          type={showPass}
          name="confirmPassword"
          value={signupInfo.confirmPassword}
          onChange={inputHander}
          label={{ className: "label", text: "Confirm Passowrd" }}
          placeholder="Confirm Password"
        />
        <hr />
        <Button type="submit" disabled={loading} text="Signup" />
      </Form>
    </>
  );
}
