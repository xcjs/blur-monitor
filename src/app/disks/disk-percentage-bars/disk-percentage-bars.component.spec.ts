import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiskPercentageBarsComponent } from './disk-percentage-bars.component';

describe('DiskPercentageBarsComponent', () => {
  let component: DiskPercentageBarsComponent;
  let fixture: ComponentFixture<DiskPercentageBarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiskPercentageBarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiskPercentageBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
