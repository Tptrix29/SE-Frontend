import React from 'react';
import ReactDOM from 'react-dom/client';
import { SystemControllerBar } from '../components/SystemControllerBar';
import CourseIntro from '../components/CourseIntro';
import AdminNav from '../components/AdminNav';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <SystemControllerBar/>
        <AdminNav/>
        <CourseIntro/>
    </div>
);


