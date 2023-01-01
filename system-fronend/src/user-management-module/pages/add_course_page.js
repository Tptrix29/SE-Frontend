import React from 'react';
import ReactDOM from 'react-dom/client';
import { SystemControllerBar } from '../components/SystemControllerBar';
import AdminNav from '../components/AdminNav';
import CourseAddPanel from '../components/CourseAddPanel';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <SystemControllerBar/>
        <AdminNav/>
        <CourseAddPanel/>
    </div>
);