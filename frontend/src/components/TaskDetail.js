import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TaskDetail = () => {
    const { id } = useParams(); // Get the task ID from the URL
    const [task, setTask] = useState(null);

    // Function to fetch task details from the server
    const fetchTask = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/tasks/${id}`);
            setTask(data); // Set the fetched task data to state
        } catch (error) {
            console.error('There was an error fetching the task!', error);
        }
    };

    useEffect(() => {
        fetchTask(); // Fetch the task details when the component mounts
    }, [id]);

    // Function to toggle the task's status between 'pending' and 'completed'
    const handleStatusToggle = async () => {
        const updatedStatus = task.status === 'pending' ? 'completed' : 'pending';
        try {
            await axios.put(`http://localhost:5000/api/tasks/${id}`, { ...task, status: updatedStatus });
            fetchTask(); // Refresh task details after status update
        } catch (error) {
            console.error('There was an error updating the task status!', error);
        }
    };

    if (!task) return <div>Loading...</div>; // Show a loading message until the task is fetched

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">{task.title}</h2>
            <p className="text-lg text-gray-600">{task.description}</p>
            <div className="mt-4">
                <p className="text-gray-700"><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                <p className={`text-lg font-semibold ${task.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                    <strong>Status:</strong> {task.status}
                </p>
                <p className="text-lg" style={{ color: task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'orange' : 'green' }}>
                    <strong>Priority:</strong> {task.priority}
                </p>
            </div>
            <button onClick={handleStatusToggle} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                Mark as {task.status === 'pending' ? 'Completed' : 'Pending'}
            </button>
        </div>
    );
};

export default TaskDetail;
