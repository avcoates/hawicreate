import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArtPieceDialogComponent } from './new-art-piece-dialog.component';

describe('NewArtPieceDialogComponent', () => {
  let component: NewArtPieceDialogComponent;
  let fixture: ComponentFixture<NewArtPieceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewArtPieceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewArtPieceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
