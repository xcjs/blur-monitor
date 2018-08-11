import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisksPageComponent } from './disks-page.component';

describe('DisksPageComponent', () => {
  let component: DisksPageComponent;
  let fixture: ComponentFixture<DisksPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisksPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
