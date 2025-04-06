import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireInsertionComponent } from './formulaire-insertion.component';

describe('FormulaireInsertionComponent', () => {
  let component: FormulaireInsertionComponent;
  let fixture: ComponentFixture<FormulaireInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireInsertionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
