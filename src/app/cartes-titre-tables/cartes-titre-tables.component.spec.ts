import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartesTitreTablesComponent } from './cartes-titre-tables.component';

describe('CartesTitreTablesComponent', () => {
  let component: CartesTitreTablesComponent;
  let fixture: ComponentFixture<CartesTitreTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartesTitreTablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartesTitreTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
