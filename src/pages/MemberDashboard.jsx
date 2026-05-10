import React, {
  useEffect,
  useState
} from "react";
import {BASE_URL} from "../services/api";
import "../styles/dashboard.css";

const MemberDashboard = () => {

  const [data, setData]
    = useState(null);

  const fetchDashboard =
    async () => {

      const token =
        localStorage.getItem("token");

      const userId =
        localStorage.getItem("userId");

      const response = await fetch(
        `${BASE_URL}/dashboard/member/${userId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      if(response.ok){

        const result =
          await response.json();

        setData(result);
      }
    };

  useEffect(() => {

    fetchDashboard();

  }, []);

  if(!data){

    return <h2>Loading...</h2>;
  }

  return (

    <div className="dashboard-container">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>

          <h2>
            Dashboard
          </h2>

          <p>
            Overview of your tasks
            and projects
          </p>

        </div>

      </div>

      {/* GRID */}

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <div className="card-top">

            <span className="card-icon">
              📁
            </span>

          </div>

          <h3>
            {data.totalProjects}
          </h3>

          <p>
            My Projects
          </p>

        </div>

        <div className="dashboard-card">

          <div className="card-top">

            <span className="card-icon">
              ✅
            </span>

          </div>

          <h3>
            {data.totalTasks}
          </h3>

          <p>
            My Tasks
          </p>

        </div>

        <div className="dashboard-card">

          <div className="card-top">

            <span className="card-icon">
              ✔️
            </span>

          </div>

          <h3>
            {data.completedTasks}
          </h3>

          <p>
            Completed
          </p>

        </div>

        <div className="dashboard-card">

          <div className="card-top">

            <span className="card-icon">
              ⏳
            </span>

          </div>

          <h3>
            {data.inProgressTasks}
          </h3>

          <p>
            In Progress
          </p>

        </div>

        <div className="dashboard-card">

          <div className="card-top">

            <span className="card-icon">
              📝
            </span>

          </div>

          <h3>
            {data.todoTasks}
          </h3>

          <p>
            To Do
          </p>

        </div>

        <div className="dashboard-card">

          <div className="card-top">

            <span className="card-icon">
              ⚠️
            </span>

          </div>

          <h3>
            {data.overdueTasks}
          </h3>

          <p>
            Overdue
          </p>

        </div>

      </div>

    </div>
  );
};

export default MemberDashboard;