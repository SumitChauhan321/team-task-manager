import React, { useState } from "react";

import {
  Link,
  useLocation
} from "react-router-dom";

import "../styles/Sidebar.css";

const Sidebar = () => {

  const role =
    localStorage.getItem("role")
    || "MEMBER";

  const name =
    localStorage.getItem("name")
    || "User";

  const location =
    useLocation();

  const [open, setOpen]
    = useState(false);

  return (
    <>

      {/* MOBILE MENU */}

      <div
        className="hamburger"
        onClick={() => setOpen(true)}
      >
        ☰
      </div>

      {/* OVERLAY */}

      {open && (

        <div
          className="overlay"
          onClick={() => setOpen(false)}
        ></div>

      )}

      {/* SIDEBAR */}

      <div
        className={`sidebar ${
          open ? "show" : ""
        }`}
      >

        {/* LOGO */}

        <div className="logo-section">

          <div className="logo-icon">
            ✓
          </div>

          <h2>
            Team Task Manager
          </h2>

        </div>

        {/* MENU */}

        <div className="menu">

          <Link
            to="/dashboard"
            className={
              location.pathname ===
              "/dashboard"

              ?

              "active"

              :

              ""
            }
            onClick={() =>
              setOpen(false)
            }
          >
            🏠 Dashboard
          </Link>

          <Link
            to="/projects"
            className={
              location.pathname ===
              "/projects"

              ?

              "active"

              :

              ""
            }
            onClick={() =>
              setOpen(false)
            }
          >
            📁 Projects
          </Link>

          {role === "ADMIN" && (

            <>

              <Link
                to="/tasks"
                className={
                  location.pathname ===
                  "/tasks"

                  ?

                  "active"

                  :

                  ""
                }
                onClick={() =>
                  setOpen(false)
                }
              >
                ✅ Tasks
              </Link>

              <Link
                to="/manage-members"
                className={
                  location.pathname ===
                  "/manage-members"

                  ?

                  "active"

                  :

                  ""
                }
                onClick={() =>
                  setOpen(false)
                }
              >
                👥 Manage Members
              </Link>

            </>

          )}

          {role === "MEMBER" && (

            <Link
              to="/tasks"
              className={
                location.pathname ===
                "/tasks"

                ?

                "active"

                :

                ""
              }
              onClick={() =>
                setOpen(false)
              }
            >
              📋 My Tasks
            </Link>

          )}

        </div>

        {/* LOGOUT */}

        <div className="logout">

          <Link
            to="/"
            onClick={() => {

              localStorage.clear();

              setOpen(false);
            }}
          >
            🚪 Logout
          </Link>

        </div>

      </div>

      {/* HEADER */}

      <div className="top-header">

        <div></div>

        {/* PROFILE */}

        <div className="profile-section">

          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="profile"
          />

          <div className="profile-info">

            <h4>
              {name}
            </h4>

            <p>
              {role}
            </p>

          </div>

        </div>

      </div>

    </>
  );
};

export default Sidebar;