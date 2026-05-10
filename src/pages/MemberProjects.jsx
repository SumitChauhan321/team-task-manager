import React, {
  useEffect,
  useState
} from "react";
import {BASE_URL} from "../services/api";
import "../styles/MemberProjects.css";

const MemberProjects = () => {

  const [projects, setProjects]
    = useState([]);

  /* =========================
      FETCH PROJECTS
  ========================= */

  const fetchProjects =
    async () => {

      const token =
        localStorage.getItem("token");

      const userId =
        localStorage.getItem("userId");

      const response = await fetch(
        `${BASE_URL}/member-features/projects/${userId}`,
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

        setProjects(data);
      }
    };

  useEffect(() => {

    fetchProjects();

  }, []);

  return (

    <div className="member-projects">

      {/* HEADER */}

      <div className="member-top">

        <div>

          <h2>
            Projects
          </h2>

          <p>
            View all projects
            assigned to you
          </p>

        </div>

      </div>

      {/* TABLE */}

      <div className="member-table-box">

        <table>

          <thead>

            <tr>
              <th>Project Name</th>
              <th>Description</th>
              <th>Total Tasks</th>
            </tr>

          </thead>

          <tbody>

            {projects.map((item) => (

              <tr key={item.id}>

                <td>
                  {item.name}
                </td>

                <td>
                  {item.description}
                </td>

                <td>
                  {item.totalTasks}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MemberProjects;