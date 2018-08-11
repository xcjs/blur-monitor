import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthPageComponent } from './auth/auth-page/auth-page.component';
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';
import { DisksPageComponent } from './disks/disks-page/disks-page.component';
import { MemoryPageComponent } from './memory/memory-page/memory-page.component';
import { NetworkPageComponent } from './network/network-page/network-page.component';
import { ProcessesPageComponent } from './processes/processes-page/processes-page.component';
import { ProcessorPageComponent } from './processor/processor-page/processor-page.component';

const appRoutes: Routes = [
  [
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
  ]
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
