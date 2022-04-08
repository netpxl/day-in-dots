import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerComponent } from './datepicker.component';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DatepickerComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit previous date correctly', async () => {
    component.selectedDate = new Date(2012, 11, 20);
    const emitNewDateSpy = spyOn(component.dateChanged, 'emit');
    component.selectPreviousDate();
    expect(emitNewDateSpy).toHaveBeenCalledWith('20121119');
  });

  it('should emit next date correctly', async () => {
    component.selectedDate = new Date(2012, 11, 20);
    const emitNewDateSpy = spyOn(component.dateChanged, 'emit');
    component.selectNextDate();
    expect(emitNewDateSpy).toHaveBeenCalledWith('20121121');
  });

  it('should emit next date correctly when switching month and year', async () => {
    const emitNewDateSpy = spyOn(component.dateChanged, 'emit');
    component.selectedDate = new Date(2012, 11, 31);
    component.selectNextDate();
    expect(emitNewDateSpy).toHaveBeenCalledWith('201301');
  });
});
