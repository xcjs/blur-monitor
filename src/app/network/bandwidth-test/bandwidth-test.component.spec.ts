import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandwidthTestComponent } from './bandwidth-test.component';

describe('BandwidthTestComponent', () => {
  let component: BandwidthTestComponent;
  let fixture: ComponentFixture<BandwidthTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandwidthTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandwidthTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
