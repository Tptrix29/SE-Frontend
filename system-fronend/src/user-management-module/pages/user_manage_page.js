import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminNav from '../components/AdminNav';
import CheckPanel from '../components/CheckPanel';
import { SystemControllerBar } from '../components/SystemControllerBar';
import UserManagePanel from '../components/UserMangePanel';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <SystemControllerBar/>
        <AdminNav />
        <UserManagePanel/>
    </div>
);


