import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireDonneeComponent } from './formulaire-donnee.component';

describe('FormulaireDonneeComponent', () => {
  let component: FormulaireDonneeComponent;
  let fixture: ComponentFixture<FormulaireDonneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireDonneeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireDonneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
