import React from 'react';
import TaskEdit from '../components/TaskEdit';

const TaskEditPage = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-4">Edit Task</h1>
            <TaskEdit />
        </div>
    );
};

export default TaskEditPage;
