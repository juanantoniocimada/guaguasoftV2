import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRestrictionsLocationsLineHourComponent } from './form-restrictions-locations-line-hour.component';

describe('FormRestrictionsLocationsLineHourComponent', () => {
  let component: FormRestrictionsLocationsLineHourComponent;
  let fixture: ComponentFixture<FormRestrictionsLocationsLineHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRestrictionsLocationsLineHourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormRestrictionsLocationsLineHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
