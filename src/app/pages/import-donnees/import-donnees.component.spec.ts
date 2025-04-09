import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDonneesComponent } from './import-donnees.component';

describe('ImportDonneesComponent', () => {
  let component: ImportDonneesComponent;
  let fixture: ComponentFixture<ImportDonneesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportDonneesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportDonneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
