import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorLineChartComponent } from './processor-line-chart.component';

describe('ProcessorLineChartComponent', () => {
  let component: ProcessorLineChartComponent;
  let fixture: ComponentFixture<ProcessorLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessorLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessorLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
