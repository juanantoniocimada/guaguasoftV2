import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictionsLocationsDayOfTheWeekComponent } from './restrictions-locations-day-of-the-week.component';

describe('RestrictionsLocationsDayOfTheWeekComponent', () => {
  let component: RestrictionsLocationsDayOfTheWeekComponent;
  let fixture: ComponentFixture<RestrictionsLocationsDayOfTheWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestrictionsLocationsDayOfTheWeekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestrictionsLocationsDayOfTheWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
