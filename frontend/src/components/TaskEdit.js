import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('pending');
    const [priority, setPriority] = useState('low');

    const fetchTask = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/tasks/${id}`);
            setTitle(data.title);
            setDescription(data.description);
            setDueDate(data.dueDate);
            setStatus(data.status);
            setPriority(data.priority);
        } catch (error) {
            console.error('There was an error fetching the task!', error);
        }
    };

    useEffect(() => {
        fetchTask();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5000/api/tasks/${id}`, {
                title,
                description,
                dueDate,
                status,
                priority,
            });
            navigate('/');
        } catch (error) {
            console.error('There was an error updating the task!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <div className="mb-2">
                <label className="block text-gray-700">Title</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Description</label>
                <textarea
                    className="w-full px-3 py-2 border rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Due Date</label>
                <input
                    type="date"
                    className="w-full px-3 py-2 border rounded"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Status</label>
                <select
                    className="w-full px-3 py-2 border rounded"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Priority</label>
                <select
                    className="w-full px-3 py-2 border rounded"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    required
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Update Task
            </button>
        </form>
    );
};

export default TaskEdit;
