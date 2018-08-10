import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiskPieChartComponent } from './disk-pie-chart.component';

describe('DiskPieChartComponent', () => {
  let component: DiskPieChartComponent;
  let fixture: ComponentFixture<DiskPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiskPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiskPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
