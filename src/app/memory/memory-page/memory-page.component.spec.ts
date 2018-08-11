import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryPageComponent } from './memory-page.component';

describe('MemoryPageComponent', () => {
  let component: MemoryPageComponent;
  let fixture: ComponentFixture<MemoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
