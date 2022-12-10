import React from 'react';
import ReactDOM from 'react-dom/client';
import { SystemControllerBar } from '../../user-management-module/components/SystemControllerBar';
import ResourcePanel from '../components/ResourcePanel';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <SystemControllerBar/>
        <ResourcePanel/>
    </div>
);


