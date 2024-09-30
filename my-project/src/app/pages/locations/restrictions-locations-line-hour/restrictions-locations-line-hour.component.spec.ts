import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictionsLocationsLineHourComponent } from './restrictions-locations-line-hour.component';

describe('RestrictionsLocationsLineHourComponent', () => {
  let component: RestrictionsLocationsLineHourComponent;
  let fixture: ComponentFixture<RestrictionsLocationsLineHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestrictionsLocationsLineHourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestrictionsLocationsLineHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
