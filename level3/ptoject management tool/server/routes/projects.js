const express = require('express');
const Project = require('../models/Project');
const Task = require('../models/Task');

const router = express.Router();

router.get('/', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

router.post('/', async (req, res) => {
  const { name, description, startDate, deadline, status } = req.body;
  const project = new Project({ name, description, startDate, deadline, status });
  await project.save();
  res.status(201).json(project);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const project = await Project.findByIdAndUpdate(id, updates, { new: true });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const project = await Project.findByIdAndDelete(id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  await Task.deleteMany({ project: id });
  res.json({ message: 'Project deleted' });
});

module.exports = router;
