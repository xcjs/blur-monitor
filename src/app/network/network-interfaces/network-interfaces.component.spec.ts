import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkInterfacesComponent } from './network-interfaces.component';

describe('NetworkInterfacesComponent', () => {
  let component: NetworkInterfacesComponent;
  let fixture: ComponentFixture<NetworkInterfacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkInterfacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkInterfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
