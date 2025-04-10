import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosDifficultesComponent } from './nos-difficultes.component';

describe('NosDifficultesComponent', () => {
  let component: NosDifficultesComponent;
  let fixture: ComponentFixture<NosDifficultesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NosDifficultesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosDifficultesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
