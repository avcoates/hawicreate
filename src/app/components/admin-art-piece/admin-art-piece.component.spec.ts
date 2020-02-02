import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArtPieceComponent } from './admin-art-piece.component';

describe('AdminArtPieceComponent', () => {
  let component: AdminArtPieceComponent;
  let fixture: ComponentFixture<AdminArtPieceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminArtPieceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArtPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
