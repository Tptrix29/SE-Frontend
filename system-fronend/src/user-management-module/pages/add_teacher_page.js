import React from 'react';
import ReactDOM from 'react-dom/client';
import { SystemControllerBar } from '../../user-management-module/components/SystemControllerBar';
import AddTeacherPanel from '../components/AddTeacherPanel';
import AdminNav from '../components/AdminNav';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <SystemControllerBar/>
        <AdminNav/>
        <AddTeacherPanel/>
    </div>
);