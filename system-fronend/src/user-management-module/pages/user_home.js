import React from 'react';
import ReactDOM from 'react-dom/client';

import UserPanel from '../components/UserPanel';
import { SystemControllerBar } from '../components/SystemControllerBar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <SystemControllerBar/>
        {/* <UserPanel /> */}
    </div>
);


