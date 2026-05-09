import React, {
  useEffect,
  useState
} from "react";

import "../styles/MemberMyTasks.css";

const MemberMyTasks = () => {

  const [tasks, setTasks]
    = useState([]);

  /* =========================
        FETCH TASKS
  ========================= */

  const fetchTasks =
    async () => {

      const token =
        localStorage.getItem("token");

      const userId =
        localStorage.getItem("userId");

      const response = await fetch(
        `http://localhost:8080/member-features/tasks/${userId}`,
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

        setTasks(data);
      }
    };

  useEffect(() => {

    fetchTasks();

  }, []);

  /* =========================
        UPDATE STATUS
  ========================= */

  const handleStatusChange =
    async (taskId, status) => {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8080/member-features/tasks/${taskId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`
          },

          body: JSON.stringify({
            status
          })
        }
      );

      if(response.ok){

        fetchTasks();
      }
    };

  return (

    <div className="member-tasks">

      {/* HEADER */}

      <div className="member-task-top">

        <div>

          <h2>
            My Tasks
          </h2>

          <p>
            View and update
            assigned tasks
          </p>

        </div>

      </div>

      {/* TABLE */}

      <div className="member-task-table">

        <table>

          <thead>

            <tr>
              <th>Task Title</th>
              <th>Project</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {tasks.map((task) => (

              <tr key={task.id}>

                <td>
                  {task.title}
                </td>

                <td>
                  {task.project}
                </td>

                <td>

                  <span
                    className={`status ${task.status
                      .replace(" ", "")
                      .toLowerCase()}`}
                  >
                    {task.status}
                  </span>

                </td>

                <td>
                  {task.dueDate}
                </td>

                <td>

                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(
                        task.id,
                        e.target.value
                      )
                    }
                  >

                    {/* CURRENT STATUS */}

                    {
                      task.status === "To Do" && (

                        <option value="To Do">
                          To Do
                        </option>

                      )
                    }

                    {
                      task.status === "In Progress" && (

                        <option value="In Progress">
                          In Progress
                        </option>

                      )
                    }

                    {
                      task.status === "Done" && (

                        <option value="Done">
                          Done
                        </option>

                      )
                    }

                    {/* UPDATE OPTIONS */}

                    {
                      task.status !== "In Progress" && (

                        <option value="In Progress">
                          In Progress
                        </option>

                      )
                    }

                    {
                      task.status !== "Done" && (

                        <option value="Done">
                          Done
                        </option>

                      )
                    }

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MemberMyTasks;