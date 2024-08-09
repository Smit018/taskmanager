import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskListPage from './pages/TaskListPage';
import TaskFormPage from './pages/TaskFormPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import TaskEditPage from './pages/TaskEditPage';

const App = () => {
    return (
        <Router>
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<TaskListPage />} />
                    <Route path="/create" element={<TaskFormPage />} />
                    <Route path="/task/:id" element={<TaskDetailsPage />} />
                    <Route path="/edit/:id" element={<TaskEditPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;



