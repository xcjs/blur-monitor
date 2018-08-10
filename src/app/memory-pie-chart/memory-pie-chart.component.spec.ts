import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryPieChartComponent } from './memory-pie-chart.component';

describe('MemoryPieChartComponent', () => {
  let component: MemoryPieChartComponent;
  let fixture: ComponentFixture<MemoryPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
