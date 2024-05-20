import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTaskListComponent } from './employee-task-list.component';

describe('EmployeeTaskListComponent', () => {
  let component: EmployeeTaskListComponent;
  let fixture: ComponentFixture<EmployeeTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeTaskListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
