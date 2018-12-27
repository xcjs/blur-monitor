import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { DiskPieChartComponent } from './disks/disk-pie-chart/disk-pie-chart.component';
import { DiskPercentageBarsComponent } from './disks/disk-percentage-bars/disk-percentage-bars.component';
import { MemoryPieChartComponent } from './memory/memory-pie-chart/memory-pie-chart.component';
import { BandwidthLineChartComponent } from './network/bandwidth-line-chart/bandwidth-line-chart.component';
import { BandwidthTestComponent } from './network/bandwidth-test/bandwidth-test.component';
import { ExternalIpPanelComponent } from './network/external-ip-panel/external-ip-panel.component';
import { NetworkInterfacesComponent } from './network/network-interfaces/network-interfaces.component';
import { ReverseTracerouteComponent } from './network/reverse-traceroute/reverse-traceroute.component';
import { LoadedProcessesListComponent } from './processes/loaded-processes-list/loaded-processes-list.component';
import { LoadedProcessesPieChartComponent } from './memory/loaded-processes-pie-chart/loaded-processes-pie-chart.component';
import { ProcessTreeComponent } from './processes/process-tree/process-tree.component';
import { RunningProcessesListComponent } from './processes/running-processes-list/running-processes-list.component';
import { RunningProcessesPieChartComponent } from './processor/running-processes-pie-chart/running-processes-pie-chart.component';
import { ProcessorLineChartComponent } from './processor/processor-line-chart/processor-line-chart.component';
import { ProcessorStatsComponent } from './processor/processor-stats/processor-stats.component';
import { SystemInfoComponent } from './system/system-info/system-info.component';
import { NavigationComponent } from './ui/navigation/navigation.component';
import { HeaderComponent } from './ui/header/header.component';
import { AuthFormComponent } from './auth/auth-form/auth-form.component';
import { SpinnerComponent } from './ui/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    DiskPieChartComponent,
    DiskPercentageBarsComponent,
    MemoryPieChartComponent,
    BandwidthLineChartComponent,
    BandwidthTestComponent,
    ExternalIpPanelComponent,
    NetworkInterfacesComponent,
    ReverseTracerouteComponent,
    LoadedProcessesListComponent,
    LoadedProcessesPieChartComponent,
    ProcessTreeComponent,
    RunningProcessesListComponent,
    RunningProcessesPieChartComponent,
    ProcessorLineChartComponent,
    ProcessorStatsComponent,
    NavigationComponent,
    HeaderComponent,
    SystemInfoComponent,
    AuthFormComponent,
    SpinnerComponent
  ],
  imports: [AppRoutingModule, BrowserModule, StorageServiceModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
