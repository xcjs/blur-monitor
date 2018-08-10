import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadedProcessesPieChartComponent } from './loaded-processes-pie-chart.component';

describe('LoadedProcessesPieChartComponent', () => {
  let component: LoadedProcessesPieChartComponent;
  let fixture: ComponentFixture<LoadedProcessesPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadedProcessesPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadedProcessesPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
