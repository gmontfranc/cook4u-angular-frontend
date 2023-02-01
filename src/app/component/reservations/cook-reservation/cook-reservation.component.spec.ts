import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookReservationComponent } from './cook-reservation.component';

describe('CookReservationComponent', () => {
  let component: CookReservationComponent;
  let fixture: ComponentFixture<CookReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
