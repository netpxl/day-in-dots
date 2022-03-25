import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityManagmentComponent } from './activity-managment.component';

describe('ActivityManagmentComponent', () => {
  let component: ActivityManagmentComponent;
  let fixture: ComponentFixture<ActivityManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
