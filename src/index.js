import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import App from "./components/App";
import Template from "./components/templates";
import Form from "./components/form";
import ResumeTwo from "./components/resume2";
import ResumeThree from "./components/resume3";
import Login from "./components/login";
import SignUp from "./components/signup";
import axios from "axios";

axios.defaults.withCredentials = true;

function Fun({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get("http://localhost:5000/getuser")
      .then((res) => {
        if (res.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return isAuthenticated ? children : <Navigate to="/" />;
}

function App2() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Fun><App /></Fun>} />
        <Route path="/templates" element={
          <Fun>
          <Template />
          </Fun>} />
        <Route path="/form" element={
          <Fun>
          <Form />
      </Fun>} />
        <Route path="/template1" element={
          <Fun>
          <Form />
          </Fun>
        } />
        <Route path="/template2" element={
          <Fun>
          <ResumeTwo />
          </Fun>
        } />
        <Route path="/template3" element={
          <Fun>
          <ResumeThree />
          </Fun>
        } />
        <Route path="/" element={
          <Login />

        } />
        <Route path="/signup" element={
          <SignUp />
        } />
      </Routes>
    </Router>
  );
}

ReactDOM.render(
  <App2 />,
  document.querySelector(".root")
);
