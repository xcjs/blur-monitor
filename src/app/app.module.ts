import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginPanelComponent } from './login-panel/login-panel.component';
import { DiskPieChartComponent } from './disk-pie-chart/disk-pie-chart.component';
import { DiskPercentageBarsComponent } from './disk-percentage-bars/disk-percentage-bars.component';
import { MemoryPieChartComponent } from './memory-pie-chart/memory-pie-chart.component';
import { BandwidthLineChartComponent } from './bandwidth-line-chart/bandwidth-line-chart.component';
import { BandwidthTestComponent } from './bandwidth-test/bandwidth-test.component';
import { ExternalIpPanelComponent } from './external-ip-panel/external-ip-panel.component';
import { NetworkInterfacesComponent } from './network-interfaces/network-interfaces.component';
import { ReverseTracerouteComponent } from './reverse-traceroute/reverse-traceroute.component';
import { LoadedProcessesListComponent } from './loaded-processes-list/loaded-processes-list.component';
import { LoadedProcessesPieChartComponent } from './loaded-processes-pie-chart/loaded-processes-pie-chart.component';
import { ProcessTreeComponent } from './process-tree/process-tree.component';
import { RunningProcessesListComponent } from './running-processes-list/running-processes-list.component';
import { RunningProcessesPieChartComponent } from './running-processes-pie-chart/running-processes-pie-chart.component';
import { ProcessorLineChartComponent } from './processor-line-chart/processor-line-chart.component';
import { ProcessorStatsComponent } from './processor-stats/processor-stats.component';
import { SystemStatusComponent } from './system-status/system-status.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPanelComponent,
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
    SystemStatusComponent,
    NavigationComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
