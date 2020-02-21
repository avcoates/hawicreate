import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactRequestComponent } from './admin-contact-request.component';

describe('AdminContactComponent', () => {
  let component: AdminContactRequestComponent;
  let fixture: ComponentFixture<AdminContactRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminContactRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContactRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
