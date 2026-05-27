import { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './index.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState('');

  const loadProjects = async () => {
    try {
      const { data } = await axios.get('/api/projects');
      setProjects(data);
    } catch (err) {
      setError('Unable to load projects');
    }
  };

  const loadTasks = async () => {
    try {
      const { data } = await axios.get('/api/tasks');
      setTasks(data);
    } catch (err) {
      setError('Unable to load tasks');
    }
  };

  useEffect(() => {
    loadProjects();
    loadTasks();
  }, []);

  const refresh = async () => {
    await Promise.all([loadProjects(), loadTasks()]);
  };

  const filteredTasks = selectedProject ? tasks.filter((task) => task.project?._id === selectedProject._id) : tasks;

  return (
    <div className="app-shell">
      <header>
        <h1>Project Management Tool</h1>
        <p>Create projects, assign tasks, set deadlines, and track progress.</p>
      </header>

      {error && <div className="error">{error}</div>}

      <div className="layout">
        <section className="panel">
          <ProjectForm onCreate={refresh} />
          <ProjectList
            projects={projects}
            selectedProject={selectedProject}
            onSelect={setSelectedProject}
            onRefresh={refresh}
          />
        </section>

        <section className="panel">
          <TaskForm projects={projects} onCreate={refresh} />
          <TaskList tasks={filteredTasks} onRefresh={refresh} />
        </section>
      </div>
    </div>
  );
}

export default App;
