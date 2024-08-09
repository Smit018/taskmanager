import React, { useState } from 'react';
import TaskForm from '../components/TaskForm';

const TaskFormPage = () => {
    const [refresh, setRefresh] = useState(false);

    const refreshTasks = () => {
        setRefresh(!refresh);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 mb-10">
            <h1 className="text-4xl font-bold mb-4 text-center">Task Manager</h1>
            <TaskForm refreshTasks={refreshTasks} />
        </div>
    );
};

export default TaskFormPage;
