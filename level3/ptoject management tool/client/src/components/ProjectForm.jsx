import { useState } from 'react';
import axios from 'axios';

const ProjectForm = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('Not Started');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('/api/projects', { name, description, deadline, status });
    setName('');
    setDescription('');
    setDeadline('');
    setStatus('Not Started');
    onCreate();
  };

  return (
    <div className="card">
      <h2>New Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Deadline
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
        </label>
        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Complete</option>
          </select>
        </label>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
