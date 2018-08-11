import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorPageComponent } from './processor-page.component';

describe('ProcessorPageComponent', () => {
  let component: ProcessorPageComponent;
  let fixture: ComponentFixture<ProcessorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
