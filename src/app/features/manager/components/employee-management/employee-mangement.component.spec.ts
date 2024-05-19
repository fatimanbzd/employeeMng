import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMangementComponent } from './employee-mangement.component';

describe('EmployeeMangementComponent', () => {
  let component: EmployeeMangementComponent;
  let fixture: ComponentFixture<EmployeeMangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeMangementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
