import axios from "axios";
import { AuthContext } from "../App";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { useState } from "react";

const RegisterFormPage = () => {
  const type = "register";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitRequest, setSubmitRequest] = useState({});
  useState({ isLoading: false, submitted: false, error: false });
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const onRegisterSubmit = async (e) => {
    //xano conta com o email brunogabado@hotmail.com

    try {
      e.preventDefault();
      setSubmitRequest({ isLoading: true });

      const response = await axios.post("https://x8ki-letl-twmt.n7.xano.io/api:HLTdxY5f/auth/signup", { email, name, password });
      localStorage.setItem("authToken", response.data.authToken);
      const response2 = await axios.get("https://x8ki-letl-twmt.n7.xano.io/api:HLTdxY5f/auth/me", {
        headers: {
          Authorization: "Bearer " + response.data.authToken,
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
      setName={setName}
      setEmail={setEmail}
      setPassword={setPassword}
      email={email}
      name={name}
      password={password}
      submitRequest={submitRequest}
      handleSubmit={onRegisterSubmit}
    />
  );
};

export default RegisterFormPage;
