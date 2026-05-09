// src/App.jsx

import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";

import AdminProjects from "./pages/AdminProjects";
import MemberProjects from "./pages/MemberProjects";

import Layout from "./components/Layout";
import AdminTasks from "./pages/AdminTasks";
import MemberMyTasks from "./pages/MemberMyTasks";
import ManageMembers from "./pages/ManageMembers";
const App = () => {

  const role = localStorage.getItem("role");

  return (

    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        {/* Projects */}

        <Route
          path="/projects"
          element={
            <Layout>

              {
                role === "ADMIN"
                  ? <AdminProjects />
                  : <MemberProjects />
              }

            </Layout>
          }
        />
        <Route
  path="/tasks"
  element={
    <Layout>

      {
        localStorage.getItem("role") === "ADMIN"
          ? <AdminTasks />
          : <MemberMyTasks />
      }

    </Layout>
  }
/>
<Route
  path="/manage-members"
  element={
    <Layout>
      <ManageMembers />
    </Layout>
  }
/>

      </Routes>

    </BrowserRouter>
  );
};

export default App;