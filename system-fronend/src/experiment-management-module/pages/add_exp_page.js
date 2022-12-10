import React from 'react';
import ReactDOM from 'react-dom/client';
import { SystemControllerBar } from '../../user-management-module/components/SystemControllerBar';
import UserNav from '../../user-management-module/components/UserNav';
import ExpAddPanel from '../components/ExpAddPanel';
import ExpForm from '../components/ExpForm';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <SystemControllerBar/>
        <UserNav/>
        <ExpAddPanel/>
    </div>
);


