import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import { useNavigate } from 'react-router-dom';

const TaskList = ({ refresh }) => {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [tasksPerPage] = useState(5); // Number of tasks to display per page
    const navigate = useNavigate();

    // Fetch the tasks from the server
    const fetchTasks = useCallback(async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/tasks');
            setTasks(data); // Set the fetched tasks to state
        } catch (error) {
            console.error('There was an error fetching the tasks!', error);
        }
    }, []);

    // Fetch tasks whenever the component mounts or the refresh prop changes
    useEffect(() => {
        fetchTasks();
    }, [refresh, fetchTasks]);

    // Sort tasks based on priority
    const sortTasksByPriority = (tasks) => {
        const priorityOrder = {
            high: 1,
            medium: 2,
            low: 3,
        };
        return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    };

    const sortedTasks = sortTasksByPriority(tasks);

    // Pagination logic to determine which tasks to display
    const indexOfLastTask = page * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

    // Handle page change
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);

    return (
        <div className="mt-8">
            <h2 className="text-4xl font-bold mb-4 text-center">Task List</h2>
            <ul className="space-y-4">
                {currentTasks.length === 0 ? (
                    <h1 className="text-3xl font-bold text-center">There are no tasks created yet</h1>
                ) : (
                    currentTasks.map((task) => (
                        <TaskItem key={task._id} task={task} refreshTasks={fetchTasks} />
                    ))
                )}
            </ul>
            <div className="mt-4 flex justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            {/* Button to navigate to the task creation page */}
            <button 
                onClick={() => navigate('/create')} 
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200">
                Create New Task
            </button>
        </div>
    );
};

export default TaskList;
