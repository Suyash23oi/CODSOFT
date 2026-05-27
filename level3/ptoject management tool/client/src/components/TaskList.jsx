import axios from 'axios';

const TaskList = ({ tasks, onRefresh }) => {
  const updateTaskStatus = async (id, status) => {
    await axios.put(`/api/tasks/${id}`, { status });
    onRefresh();
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    onRefresh();
  };

  return (
    <div className="card">
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="item-list">
          {tasks.map((task) => (
            <li key={task._id}>
              <div className="item-header">
                <strong>{task.title}</strong>
                <span>{task.project?.name ?? 'Unassigned'}</span>
              </div>
              <p>{task.description}</p>
              <div className="task-meta">
                <span>Assigned to: {task.assignedTo || 'Unassigned'}</span>
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="actions">
                <select value={task.status} onChange={(e) => updateTaskStatus(task._id, e.target.value)}>
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
                <button className="danger" onClick={() => deleteTask(task._id)}>
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

export default TaskList;
