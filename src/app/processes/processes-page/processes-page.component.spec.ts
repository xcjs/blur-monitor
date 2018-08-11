import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessesPageComponent } from './processes-page.component';

describe('ProcessesPageComponent', () => {
  let component: ProcessesPageComponent;
  let fixture: ComponentFixture<ProcessesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
