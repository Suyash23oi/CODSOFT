import { useEffect, useState } from 'react';
import axios from 'axios';

const TaskForm = ({ projects, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('To Do');
  const [project, setProject] = useState('');

  useEffect(() => {
    if (!project && projects.length > 0) {
      setProject(projects[0]._id);
    }
  }, [projects, project]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('/api/tasks', { title, description, assignedTo, dueDate, status, project });
    setTitle('');
    setDescription('');
    setAssignedTo('');
    setDueDate('');
    setStatus('To Do');
    onCreate();
  };

  return (
    <div className="card">
      <h2>New Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Project
          <select value={project} onChange={(e) => setProject(e.target.value)} required>
            <option value="" disabled>Select a project</option>
            {projects.map((proj) => (
              <option key={proj._id} value={proj._id}>{proj.name}</option>
            ))}
          </select>
        </label>
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Assigned To
          <input value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
        </label>
        <label>
          Due Date
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </label>
        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </label>
        <button type="submit" disabled={!project}>Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
