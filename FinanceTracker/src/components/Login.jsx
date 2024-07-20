import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import RLhead from "./RLhead";
import "./Login.css";
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let result;

      // Check if response is JSON
      try {
        result = await response.json();
      } catch (error) {
        // If JSON parsing fails, read the response as text
        const text = await response.text();
        console.error("Response is not JSON:", text);
        setError("form", { type: "manual", message: "An error occurred: " + text });
        return;
      }

      if (response.ok) {
        setMessage("Login successful. Redirecting to dashboard...");

        // Save token and decode it to get userId
        localStorage.setItem("token", result.token);
        const decodedToken = jwtDecode(result.token);
        const userId = decodedToken.userId;

        localStorage.setItem("userId", userId); // Save userId in localStorage

        // Fetch user data from backend
        try {
          const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
          if (!userResponse.ok) {
            throw new Error("User data fetch failed");
          }
          const userData = await userResponse.json();
          localStorage.setItem("user", JSON.stringify(userData)); // Save user data
        } catch (userError) {
          console.error("Error fetching user data:", userError);
          setError("form", { type: "manual", message: "An error occurred while fetching user data" });
          return;
        }

        // Clear sessionStorage
        sessionStorage.clear();

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError("form", { type: "manual", message: result.message || "Login failed" });
      }
    } catch (error) {
      console.error("There was an error!", error);
      setError("form", { type: "manual", message: "An error occurred" });
    }
  };

  return (
    <>
      <RLhead />
      <div className="Register">
        <div className="RLcard">
          <h1>Login to Campus Cash</h1>
          <h3>
            Don't have an account yet? <Link to="/register">Sign-up!</Link>
          </h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <ul className="registerform">
              <li>
                <label htmlFor="email" className="labels">
                  Email:
                </label>
                <input
                  className={`inputel ${errors.email ? "error-border" : ""}`}
                  placeholder="Email"
                  type="text"
                  {...register("email", {
                    required: "This field is required",
                    minLength: { value: 5, message: "Minimum length is 5" },
                  })}
                />
                {errors.email && <p className="error-text">{errors.email.message}</p>}
              </li>
              <li>
                <label htmlFor="password" className="labels">
                  Password:
                </label>
                <input
                  className={`inputel ${errors.password ? "error-border" : ""}`}
                  placeholder="Password"
                  type="password"
                  {...register("password", {
                    required: "This field is required",
                    minLength: { value: 5, message: "Minimum length is 5" },
                  })}
                />
                {errors.password && <p className="error-text">{errors.password.message}</p>}
              </li>
              <li>
                <input
                  disabled={isSubmitting}
                  type="submit"
                  value="Login to Campus Cash"
                  className="inputSub"
                />
              </li>
              {isSubmitting && <p>Loading...</p>}
              {errors.form && <p className="error-text">{errors.form.message}</p>}
              {message && <p className="success-text">{message}</p>}
            </ul>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
