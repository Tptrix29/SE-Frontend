import React from 'react';
import ReactDOM from 'react-dom/client';
import { SystemControllerBar } from '../../user-management-module/components/SystemControllerBar';
import UserNav from '../../user-management-module/components/UserNav';
import AttendanceIntro from '../components/AttendanceIntro';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <SystemControllerBar/>
        <UserNav/>
        <AttendanceIntro/>
    </div>
);


