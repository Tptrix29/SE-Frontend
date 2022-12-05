import React from 'react';
import ReactDOM from 'react-dom/client';


import LoginWindow from '../components/LoginWindow';
import UserCanvas from '../components/UserCanvas';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        {/* <LoginWindow /> */}
        <UserCanvas/>
    </div>

);


