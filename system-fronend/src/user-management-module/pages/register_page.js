import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminNav from '../components/AdminNav';
import RegisterPanel from '../components/RegisterPanel';
import { SystemControllerBar } from '../components/SystemControllerBar';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <SystemControllerBar/>
        <AdminNav />
        <RegisterPanel/>
    </div>
);


