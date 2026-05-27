const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

router.get('/', async (req, res) => {
  const tasks = await Task.find().populate('project', 'name');
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const { title, description, assignedTo, dueDate, status, project } = req.body;
  const task = new Task({ title, description, assignedTo, dueDate, status, project });
  await task.save();
  res.status(201).json(task);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const task = await Task.findByIdAndUpdate(id, updates, { new: true }).populate('project', 'name');
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
});

module.exports = router;
