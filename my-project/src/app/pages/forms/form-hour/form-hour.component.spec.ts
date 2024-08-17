import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHourComponent } from './form-hour.component';

describe('FormHourComponent', () => {
  let component: FormHourComponent;
  let fixture: ComponentFixture<FormHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
