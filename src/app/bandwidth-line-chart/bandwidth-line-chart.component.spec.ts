import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandwidthLineChartComponent } from './bandwidth-line-chart.component';

describe('BandwidthLineChartComponent', () => {
  let component: BandwidthLineChartComponent;
  let fixture: ComponentFixture<BandwidthLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandwidthLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandwidthLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
