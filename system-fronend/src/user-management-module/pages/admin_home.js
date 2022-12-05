import React from 'react';
import ReactDOM from 'react-dom/client';

import AdminPanel from '../components/AdminPanel';
import UserControllerBar from '../components/UserControlBar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <UserControllerBar />
        <AdminPanel />
    </div>
);


