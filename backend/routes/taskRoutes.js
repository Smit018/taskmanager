import express from 'express';
import {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
} from '../controllers/taskController.js';

const router = express.Router();

// Routes for retrieving all tasks and creating a new task
router.route('/')
    .get(getTasks) // Get all tasks
    .post(createTask); // Create a new task

// Routes for retrieving, updating, and deleting a task by its ID
router.route('/:id')
    .get(getTaskById) // Get a specific task by ID
    .put(updateTask) // Update a specific task by ID
    .delete(deleteTask); // Delete a specific task by ID

export default router;
