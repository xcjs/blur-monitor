import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadedProcessesListComponent } from './loaded-processes-list.component';

describe('LoadedProcessesListComponent', () => {
  let component: LoadedProcessesListComponent;
  let fixture: ComponentFixture<LoadedProcessesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadedProcessesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadedProcessesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
