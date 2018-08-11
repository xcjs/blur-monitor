import { RouterModule, Routes } from '@angular/router';

export default getRoutes();

function getRoutes(): Routes {
  return [
    {
      path: '/'
    },
    {
      path: '/login'
    },
    {
      path: 'processor'
    },
    {
      path: 'memory'
    },
    {
      path: 'disks'
    },
    {
      path: 'network'
    },
    {
      path: 'processes'
    }
  ];
}
