import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningProcessesListComponent } from './running-processes-list.component';

describe('RunningProcessesListComponent', () => {
  let component: RunningProcessesListComponent;
  let fixture: ComponentFixture<RunningProcessesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunningProcessesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningProcessesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
