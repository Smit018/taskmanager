import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TaskItem = ({ task, refreshTasks }) => {
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await axios.delete(`http://localhost:5000/api/tasks/${task._id}`);
                refreshTasks();
            } catch (error) {
                console.error('There was an error deleting the task!', error);
            }
        }
    };

    

    return (
        <li className={`p-4 border rounded shadow-md ${task.priority === 'high' ? 'bg-red-200' : task.priority === 'medium' ? 'bg-yellow-200' : 'bg-green-200'}`}>
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold mb-2">
                        <Link to={`/task/${task._id}`} className="hover:underline">{task.title}</Link>
                    </h2>
                    <p className="text-sm text-gray-600">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                    <p className={`text-sm font-semibold ${task.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>Status: {task.status}</p>
                </div>
                <div>
                   
                    <Link to={`/edit/${task._id}`} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200 mr-2">
                        Edit
                    </Link>
                    <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200">
                        Delete
                    </button>
                </div>
            </div>
        </li>
    );
};

export default TaskItem;