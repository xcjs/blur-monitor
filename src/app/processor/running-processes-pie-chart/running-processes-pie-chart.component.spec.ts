import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningProcessesPieChartComponent } from './running-processes-pie-chart.component';

describe('RunningProcessesPieChartComponent', () => {
  let component: RunningProcessesPieChartComponent;
  let fixture: ComponentFixture<RunningProcessesPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunningProcessesPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningProcessesPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
