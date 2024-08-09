import Task from '../models/taskModel.js';

// Get all tasks
export const getTasks = async (req, res) => {
    try {
        // Fetch all tasks from the database
        const tasks = await Task.find();
        // Send the tasks as a JSON response
        res.json(tasks);
    } catch (error) {
        // If an error occurs, send a 500 status with the error message
        res.status(500).json({ message: error.message });
    }
};

// Create a new task
export const createTask = async (req, res) => {
    const { title, description, dueDate, priority } = req.body;

    // Validate that all required fields are provided
    if (!title || !description || !dueDate || !priority) {
        // If any field is missing, send a 400 status with an error message
        res.status(400).json({ message: 'Please fill all fields' });
        return;
    }

    // Create a new task instance
    const task = new Task({
        title,
        description,
        dueDate,
        priority
    });

    try {
        // Save the new task to the database
        const createdTask = await task.save();
        // Send the created task as a JSON response with a 201 status
        res.status(201).json(createdTask);
    } catch (error) {
        // If an error occurs, send a 500 status with the error message
        res.status(500).json({ message: error.message });
    }
};

// Get a single task by ID
export const getTaskById = async (req, res) => {
    try {
        // Fetch the task from the database by its ID
        const task = await Task.findById(req.params.id);
        if (task) {
            // If the task is found, send it as a JSON response
            res.json(task);
        } else {
            // If the task is not found, send a 404 status with an error message
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        // If an error occurs, send a 500 status with the error message
        res.status(500).json({ message: error.message });
    }
};

// Update a task by ID
export const updateTask = async (req, res) => {
    const { title, description, dueDate, status, priority } = req.body;

    try {
        // Fetch the task from the database by its ID
        const task = await Task.findById(req.params.id);

        if (task) {
            // Update the task fields with the new data, or keep the old data if no new data is provided
            task.title = title || task.title;
            task.description = description || task.description;
            task.dueDate = dueDate || task.dueDate;
            task.status = status || task.status;
            task.priority = priority || task.priority;

            // Save the updated task to the database
            const updatedTask = await task.save();
            // Send the updated task as a JSON response
            res.json(updatedTask);
        } else {
            // If the task is not found, send a 404 status with an error message
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        // If an error occurs, send a 500 status with the error message
        res.status(500).json({ message: error.message });
    }
};

// Delete a task by ID
export const deleteTask = async (req, res) => {
    try {
        // Attempt to delete the task by its ID
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            // If the task is not found, send a 404 status with an error message
            return res.status(404).send('Task not found');
        }
        // If deletion is successful, send a 200 status with a success message
        res.status(200).send('Task deleted');
    } catch (error) {
        // If an error occurs, send a 500 status with the error message
        res.status(500).json({ message: error.message });
    }
};
