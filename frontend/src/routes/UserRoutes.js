import React from 'react';

;
const UserDashboard = React.lazy(() => import('../views/Dashboard/UserDashboard')); //My Dashboard
const UserDocument = React.lazy(()=> import('../views/Document/UserDocument'))  // My Document

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/projects', exact: true, name: 'project', component: UserDashboard },
  { path: '/document/:id',  name: 'Document', component: UserDocument },

];

export default routes;
