import React from "react";
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const { setUser } = useContext(MyContext);
  const navigate = useNavigate();

  const loginUser = (event) => {
    event.preventDefault();
    fetch("/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: event.target.email.value,
        password: event.target.password.value,
      }),
    })
      .then((res) => {
        const token = res.headers.get("token");
        localStorage.setItem("token", token);
        return res.json();
      })
      .then((result) => {
        if (result.success) {
          toast.success("Successfully LoggedIn ! ");
          setUser(result.data);
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
        } else {
          toast.error(result.message);
        }
      });
  };
  return (
    <div className="login-container">
      <h5>Log Into Test Page</h5>
      <Toaster position="top-center" />
      <form onSubmit={loginUser}>
        <label>
          {" "}
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          {" "}
          <input type="password" name="password" />
        </label>
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}
