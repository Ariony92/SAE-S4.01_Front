import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotrehistoireComponent } from './notrehistoire.component';

describe('NotrehistoireComponent', () => {
  let component: NotrehistoireComponent;
  let fixture: ComponentFixture<NotrehistoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotrehistoireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotrehistoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
