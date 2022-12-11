import React from 'react';
import ReactDOM from 'react-dom/client';
import { SystemControllerBar } from '../../user-management-module/components/SystemControllerBar';
import UserNav from '../../user-management-module/components/UserNav';
import AssignmentAddPanel from '../components/AssignmentAddPanel';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <SystemControllerBar/>
        <UserNav/>
        <AssignmentAddPanel/>
    </div>
);


