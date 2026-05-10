import React, {
  useEffect,
  useState
} from "react";
import {BASE_URL} from "../services/api";
import "../styles/dashboard.css";

const AdminDashboard = () => {

  const [stats, setStats]
    = useState([]);

  /* =========================
        FETCH DASHBOARD
  ========================= */

  const fetchDashboardData =
    async () => {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/dashboard/admin`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      if(response.ok){

        const data =
          await response.json();

        setStats([

          {
            title: "Total Projects",
            value:
              data.totalProjects,
            icon: "📁"
          },

          {
            title: "Total Tasks",
            value:
              data.totalTasks,
            icon: "✅"
          },

          {
            title: "Completed Tasks",
            value:
              data.completedTasks,
            icon: "✔️"
          },

          {
            title: "In Progress",
            value:
              data.inProgressTasks,
            icon: "⏳"
          },

          {
            title: "To Do",
            value:
              data.todoTasks,
            icon: "📝"
          },

          {
            title: "Overdue Tasks",
            value:
              data.overdueTasks,
            icon: "⚠️"
          }

        ]);
      }
    };

  useEffect(() => {

    fetchDashboardData();

  }, []);

  return (

    <div className="dashboard-container">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>

          <h2>
            Dashboard
          </h2>

          <p>
            Overview of your projects
            and tasks
          </p>

        </div>

      </div>

      {/* STATS */}

      <div className="dashboard-grid">

        {stats.map((item, index) => (

          <div
            className="dashboard-card"
            key={index}
          >

            <div className="card-top">

              <span className="card-icon">
                {item.icon}
              </span>

            </div>

            <h3>
              {item.value}
            </h3>

            <p>
              {item.title}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default AdminDashboard;