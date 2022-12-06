import React from 'react';
import ReactDOM from 'react-dom/client';

import AdminPanel from '../components/AdminPanel';
import { SystemControllerBar } from '../components/SystemControllerBar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <SystemControllerBar />
        <AdminPanel />
    </div>
);


