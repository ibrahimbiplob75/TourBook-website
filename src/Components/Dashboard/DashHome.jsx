import React, { useContext } from 'react';
import { AuthProvider } from '../../ContextProvider/ContextProvider';

const DashHome = () => {
    const {user}=useContext(AuthProvider);
    return (
        <div>
            <h3>Welcome to your Dashboard {user?.email}</h3>
        </div>
    );
};

export default DashHome;