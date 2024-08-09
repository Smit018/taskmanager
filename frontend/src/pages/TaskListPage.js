import React, { useState } from 'react';
import TaskList from '../components/TaskList';

const TaskListPage = () => {
    const [refresh, setRefresh] = useState(false);

    const refreshTasks = () => {
        setRefresh(!refresh);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 mb-10">
            <h1 className="text-4xl font-bold mb-4 text-center">Task Manager</h1>
            <TaskList refresh={refresh} />
        </div>
    );
};

export default TaskListPage;
