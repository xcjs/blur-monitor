import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTreeComponent } from './process-tree.component';

describe('ProcessTreeComponent', () => {
  let component: ProcessTreeComponent;
  let fixture: ComponentFixture<ProcessTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
