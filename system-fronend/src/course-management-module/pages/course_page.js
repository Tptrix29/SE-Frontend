import React from 'react';
import ReactDOM from 'react-dom/client';
import UserControllerBar from '../../user-management-module/components/UserControlBar';
import UserNav from '../../user-management-module/components/UserNav';
import { CoursePanel } from '../components/CoursePanel';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <UserControllerBar />
        <UserNav />
        <CoursePanel/>
    </div>
);


