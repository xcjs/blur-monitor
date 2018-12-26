import { Routes } from '@angular/router';

import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';
import { AuthPageComponent } from './auth/auth-page/auth-page.component';
import { ProcessorPageComponent } from './processor/processor-page/processor-page.component';
import { MemoryPageComponent } from './memory/memory-page/memory-page.component';
import { DisksPageComponent } from './disks/disks-page/disks-page.component';
import { NetworkPageComponent } from './network/network-page/network-page.component';
import { ProcessesPageComponent } from './processes/processes-page/processes-page.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthPageComponent
  },
  {
    path: 'processor',
    component: ProcessorPageComponent
  },
  {
    path: 'memory',
    component: MemoryPageComponent
  },
  {
    path: 'disks',
    component: DisksPageComponent
  },
  {
    path: 'network',
    component: NetworkPageComponent
  },
  {
    path: 'processes',
    component: ProcessesPageComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
