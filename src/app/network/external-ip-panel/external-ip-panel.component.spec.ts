import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalIpPanelComponent } from './external-ip-panel.component';

describe('ExternalIpPanelComponent', () => {
  let component: ExternalIpPanelComponent;
  let fixture: ComponentFixture<ExternalIpPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalIpPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalIpPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
