import React, {
  useEffect,
  useState
} from "react";
import {BASE_URL} from "../services/api";
import "../styles/AdminProjects.css";

const AdminProjects = () => {

  const [projects, setProjects]
    = useState([]);

  const [showModal, setShowModal]
    = useState(false);

  const [isEdit, setIsEdit]
    = useState(false);

  const [projectId, setProjectId]
    = useState(null);

  const [name, setName]
    = useState("");

  const [description, setDescription]
    = useState("");

  /* DELETE POPUP */

  const [showDeletePopup,
    setShowDeletePopup]
    = useState(false);

  const [deleteId,
    setDeleteId]
    = useState(null);

  /* =========================
        GET PROJECTS
  ========================= */

  const fetchProjects = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/admin/projects`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      setProjects(data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchProjects();

  }, []);

  /* =========================
        CREATE PROJECT
  ========================= */

  const handleCreateProject =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        await fetch(
          `${BASE_URL}/admin/projects`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`
            },

            body: JSON.stringify({
              name,
              description
            })
          }
        );

        fetchProjects();

        closeModal();

      } catch (error) {

        console.log(error);
      }
    };

  /* =========================
        UPDATE PROJECT
  ========================= */

  const handleUpdateProject =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        await fetch(
          `${BASE_URL}/admin/projects/${projectId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`
            },

            body: JSON.stringify({
              name,
              description
            })
          }
        );

        fetchProjects();

        closeModal();

      } catch (error) {

        console.log(error);
      }
    };

  /* =========================
        OPEN DELETE POPUP
  ========================= */

  const openDeletePopup =
    (id) => {

      setDeleteId(id);

      setShowDeletePopup(true);
  };

  /* =========================
        CONFIRM DELETE
  ========================= */

  const confirmDelete =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        await fetch(
          `${BASE_URL}/admin/projects/${deleteId}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        fetchProjects();

        setShowDeletePopup(false);

        setDeleteId(null);

      } catch (error) {

        console.log(error);
      }
    };

  /* =========================
        CANCEL DELETE
  ========================= */

  const cancelDelete = () => {

    setShowDeletePopup(false);

    setDeleteId(null);
  };

  /* =========================
        OPEN EDIT POPUP
  ========================= */

  const openEditModal =
    (project) => {

      setIsEdit(true);

      setShowModal(true);

      setProjectId(project.id);

      setName(project.name);

      setDescription(
        project.description
      );
    };

  /* =========================
        CLOSE MODAL
  ========================= */

  const closeModal = () => {

    setShowModal(false);

    setIsEdit(false);

    setProjectId(null);

    setName("");

    setDescription("");
  };

  return (

    <div className="admin-projects">

      {/* HEADER */}

      <div className="project-top">

        <div>

          <h2>
            Projects
          </h2>

          <p>
            Manage and track
            all your projects
          </p>

        </div>

        <button
          className="create-btn"
          onClick={() =>
            setShowModal(true)
          }
        >
          + Create Project
        </button>

      </div>

      {/* TABLE */}

      <div className="table-box">

        <table>

          <thead>

            <tr>

              <th>
                Project Name
              </th>

              <th>
                Description
              </th>

              <th>
                Total Members
              </th>

              <th>
                Total Tasks
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {projects.map((project) => (

              <tr key={project.id}>

                <td>
                  {project.name}
                </td>

                <td>
                  {project.description}
                </td>

                <td>
                  {project.totalMembers}
                </td>

                <td>
                  {project.totalTasks}
                </td>

                <td>

                  <div className="actions">

                    {/* EDIT */}

                    <button
                      className="edit-btn"
                      onClick={() =>
                        openEditModal(
                          project
                        )
                      }
                    >
                      ✏️
                    </button>

                    {/* DELETE */}

                    <button
                      className="delete-btn"
                      onClick={() =>
                        openDeletePopup(
                          project.id
                        )
                      }
                    >
                      🗑️
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* CREATE / EDIT MODAL */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h3>

              {
                isEdit
                  ? "Edit Project"
                  : "Create Project"
              }

            </h3>

            <input
              type="text"
              placeholder="Project Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

            <textarea
              placeholder="Project Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
            />

            <div className="modal-buttons">

              <button
                className="save-btn"
                onClick={
                  isEdit
                    ? handleUpdateProject
                    : handleCreateProject
                }
              >

                {
                  isEdit
                    ? "Update"
                    : "Create"
                }

              </button>

              <button
                className="cancel-btn"
                onClick={closeModal}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

      {/* DELETE POPUP */}

      {showDeletePopup && (

        <div className="modal-overlay">

          <div className="delete-popup">

            <h3>
              Delete Project
            </h3>

            <p>
              Are you sure you want
              to delete this project?
            </p>

            <div className="popup-buttons">

              <button
                className="cancel-popup-btn"
                onClick={cancelDelete}
              >
                Cancel
              </button>

              <button
                className="confirm-delete-btn"
                onClick={confirmDelete}
              >
                Confirm
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminProjects;