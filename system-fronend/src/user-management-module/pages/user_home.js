import React from 'react';
import ReactDOM from 'react-dom/client';

import UserPanel from '../components/UserPanel';
import UserControllerBar from '../components/UserControlBar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <UserControllerBar />
        <UserPanel />
    </div>
);


