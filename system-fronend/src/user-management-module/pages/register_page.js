import React from 'react';
import ReactDOM from 'react-dom/client';
import UserControllerBar from '../components/UserControlBar';
import AdminNav from '../components/AdminNav';
import RegisterPanel from '../components/RegisterPanel';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <UserControllerBar />
        <AdminNav />
        <RegisterPanel/>
    </div>
);


