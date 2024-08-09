import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskForm = ({ refreshTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('low');
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Post the new task data to the server
            await axios.post('http://localhost:5000/api/tasks', {
                title,
                description,
                dueDate,
                priority,
            });
            refreshTasks(); // Refresh the task list
            // Reset form fields
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('low');
            navigate('/');  // Navigate back to Task List after submission
        } catch (error) {
            console.error('There was an error creating the task!', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 mb-10">
            <h2 className="text-4xl font-bold mb-4 text-center">Create a New Task</h2>
            <form onSubmit={handleSubmit} className="mb-4 p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Create a New Task</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Title</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Due Date</label>
                    <input
                        type="date"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Priority</label>
                    <select
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200">
                    Create Task
                </button>
            </form>
            {/* Button to navigate back to Task List */}
            <button 
                onClick={() => navigate('/')} 
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-200">
                Back to Task List
            </button>
        </div>
    );
};

export default TaskForm;
