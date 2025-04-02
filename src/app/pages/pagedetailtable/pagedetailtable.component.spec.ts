import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDetailTableComponent } from './pagedetailtable.component';

describe('PagedetailtableComponent', () => {
  let component: PageDetailTableComponent;
  let fixture: ComponentFixture<PageDetailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageDetailTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
