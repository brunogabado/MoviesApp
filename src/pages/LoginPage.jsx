import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import React, { useContext } from "react";
import { AuthContext } from "../App";
import { createUseStyles } from "react-jss";

const loginStyles = createUseStyles({
  Page: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
});

const LoginForm = () => {
  const classes = loginStyles();
  const type = "login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitRequest, setSubmitRequest] = useState({});
  useState({ isLoading: false, submitted: false, error: false });
  const navigate = useNavigate();
  const { setIsAuth } = useContext(AuthContext);

  //xano conta com o email brunogabado@hotmail.com
  const onLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      setSubmitRequest({ isLoading: true });
      const response1 = await axios.post("https://x8ki-letl-twmt.n7.xano.io/api:HLTdxY5f/auth/login", { email, password });
      localStorage.setItem("authToken", response1.data.authToken);
      const response2 = await axios.get("https://x8ki-letl-twmt.n7.xano.io/api:HLTdxY5f/auth/me", {
        headers: {
          Authorization: "Bearer " + response1.data.authToken,
        },
      });
      localStorage.setItem("userName", response2.data.userData.name);
      localStorage.setItem("userID", response2.data.userData.id);
      setSubmitRequest({ error: false, isLoading: false, submitted: true });
      setIsAuth(true);
      setTimeout(() => {
        setSubmitRequest({
          submitted: false,
        });
      }, 4000);
      navigate("/accountPage");
    } catch (err) {
      console.log(err);
      setSubmitRequest({ error: true, submitted: true, errorMessage: err.response.data.message });
    }
  };

  return (
    <Form
      type={type}
      setEmail={setEmail}
      setPassword={setPassword}
      email={email}
      name={name}
      password={password}
      submitRequest={submitRequest}
      handleSubmit={onLoginSubmit}
    />
  );
};

export default LoginForm;
