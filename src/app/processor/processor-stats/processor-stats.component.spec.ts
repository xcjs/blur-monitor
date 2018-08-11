import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorStatsComponent } from './processor-stats.component';

describe('ProcessorStatsComponent', () => {
  let component: ProcessorStatsComponent;
  let fixture: ComponentFixture<ProcessorStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessorStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessorStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
