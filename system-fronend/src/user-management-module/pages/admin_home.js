import React from 'react';
import ReactDOM from 'react-dom/client';

import LoginWindow from '../components/AdminNav';
import AdminPanel from '../components/AdminPanel';
import UserControllerBar from '../components/UserControlBar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <UserControllerBar />
        <LoginWindow />
        <AdminPanel />
    </div>
);

