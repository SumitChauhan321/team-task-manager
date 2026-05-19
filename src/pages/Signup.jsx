import React, { useState } from "react";

import "../styles/signup.css";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  BASE_URL
} from "../services/api";

const Signup = () => {

  const navigate = useNavigate();

  const [name, setName]
    = useState("");

  const [email, setEmail]
    = useState("");

  const [password, setPassword]
    = useState("");

  const [confirmPassword,
    setConfirmPassword]
    = useState("");

  const [role, setRole]
    = useState("ADMIN");

  const [message, setMessage]
    = useState("");

  /* SIGNUP */

  const handleSignup =
    async (e) => {

      e.preventDefault();

      setMessage("");

      if (
        password !==
        confirmPassword
      ) {

        setMessage(
          "Passwords do not match"
        );

        return;
      }

      try {

        const response =
          await fetch(
            `${BASE_URL}/auth/signup`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                name,
                email,
                password,
                role

              }),
            }
          );

        const data =
          await response.json();

        if(response.ok){

          setMessage(
            "Signup Successful"
          );

          setTimeout(() => {

            navigate("/");

          }, 1000);

        } else {

          setMessage(
            data.message
            ||
            "Signup Failed"
          );
        }

      } catch (error) {

        setMessage(
          "Server Error"
        );
      }
    };

  return (

    <div className="signup-page">

      <div className="signup-container">

        {/* LEFT */}

        <div className="signup-left">

          <div className="logo-box">

            <div className="logo-icon">
              ✓
            </div>

            <h2>
              Team Task Manager
            </h2>

          </div>

          <div className="left-content">

            <h1>
              Manage Your Team
            </h1>

            <p>
              Organize projects,
              tasks and members
              in one place.
            </p>

          </div>

          <div className="feature-wrapper">

            <div className="feature-card">
              📁 Projects
            </div>

            <div className="feature-card">
              ✅ Tasks
            </div>

            <div className="feature-card">
              👥 Members
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="signup-right">

          <div className="signup-header">

            <h2>
              Sign Up
            </h2>

            <p>
              Create your account
            </p>

          </div>

          <form
            className="signup-form"
            onSubmit={handleSignup}
          >

            {/* NAME */}

            <div className="signup-input-group">

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* EMAIL */}

            <div className="signup-input-group">

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="signup-input-group">

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* CONFIRM */}

            <div className="signup-input-group">

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* ROLE */}

            <div className="role-section">

              <p className="role-title">
                Select Role
              </p>

              <div className="role-options">

                <div
                  className={`role-card ${
                    role === "ADMIN"
                    ?
                    "active-role"
                    :
                    ""
                  }`}
                  onClick={() =>
                    setRole("ADMIN")
                  }
                >
                  🛡 Admin
                </div>

                <div
                  className={`role-card ${
                    role === "MEMBER"
                    ?
                    "active-role"
                    :
                    ""
                  }`}
                  onClick={() =>
                    setRole("MEMBER")
                  }
                >
                  👤 Member
                </div>

              </div>

            </div>

            {/* MESSAGE */}

            {message && (

              <p className="error-msg">
                {message}
              </p>

            )}

            {/* BUTTON */}

            <button type="submit">
              Sign Up
            </button>

            {/* LOGIN */}

            <p className="login-text">

              Already have an account?

              <Link to="/">
                Login
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Signup;