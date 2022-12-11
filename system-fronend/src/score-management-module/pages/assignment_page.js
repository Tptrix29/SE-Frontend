import React from 'react';
import ReactDOM from 'react-dom/client';
import { SystemControllerBar } from '../../user-management-module/components/SystemControllerBar';
import UserNav from '../../user-management-module/components/UserNav';
import AssignmentIntro from '../components/AssignmentIntro';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <SystemControllerBar/>
        <UserNav/>
        <AssignmentIntro/>
    </div>
);


