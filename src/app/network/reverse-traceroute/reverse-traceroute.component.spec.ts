import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReverseTracerouteComponent } from './reverse-traceroute.component';

describe('ReverseTracerouteComponent', () => {
  let component: ReverseTracerouteComponent;
  let fixture: ComponentFixture<ReverseTracerouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReverseTracerouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReverseTracerouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
