import axios from 'axios';

const ProjectList = ({ projects, selectedProject, onSelect, onRefresh }) => {
  const updateProjectStatus = async (id, status) => {
    await axios.put(`/api/projects/${id}`, { status });
    onRefresh();
  };

  const deleteProject = async (id) => {
    await axios.delete(`/api/projects/${id}`);
    onRefresh();
  };

  return (
    <div className="card">
      <h2>Projects</h2>
      {projects.length === 0 ? (
        <p>No projects created yet.</p>
      ) : (
        <ul className="item-list">
          {projects.map((project) => (
            <li
              key={project._id}
              className={selectedProject?._id === project._id ? 'selected' : ''}
            >
              <button className="link-button" onClick={() => onSelect(project)}>
                {project.name}
              </button>
              <div className="project-meta">
                <span>{new Date(project.deadline).toLocaleDateString()}</span>
                <span>{project.status}</span>
              </div>
              <div className="actions">
                <select
                  value={project.status}
                  onChange={(e) => updateProjectStatus(project._id, e.target.value)}
                >
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Complete</option>
                </select>
                <button className="danger" onClick={() => deleteProject(project._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;
